function init() {
  drawLogo();
  $("#windowSlider").on("change", function () {
    processInput();
  });

  $("#opaqueThick").on("change", function () {
    processInput();
  });

  let construction = $("#opaqueThick").val();
  let window = $("#windowSlider").val();
  draw(construction, window);
}
// dropdown menu constants for insulation
const BARE = "Bare Container (R1)";
const FINISH_ONLY = "Plus Interior Finish, Uninsulated (R2)";
const CELLULOSE = "Plus Finish and Cellulose (R3/in)";
const FIBERGLASS = "Plus Finish and Fiberglass (R3/in)";
const SPRAY_FOAM = "Plus Finish and Spray Foam (R6/in)";

//Crate proportion for canvas 1 (in inches/before magnification)
const CANVAS_HEIGHT = 132;
const CANVAS_WIDTH = 238;
const DOOR_LENGTH = 36;
const CONTAINER_WIDTH = CANVAS_WIDTH;
const CONTAINER_HEIGHT = CANVAS_HEIGHT - DOOR_LENGTH;

//When drawing on canvas, always multiply constants by multiplier
const MAGNIFIER = 1.35;

//Adjusted container sizes for drawing
const ADJ_CONTAINER_WIDTH = CONTAINER_WIDTH * MAGNIFIER;
const ADJ_CONTAINER_HEIGHT = CONTAINER_HEIGHT * MAGNIFIER;

/* Selects the appropriate color to represent
the selected insulation option
Author: Alexandra Embree (A00443068)*/
function changeInsulation() {
  let plan = document.getElementById("plan");
  let context = plan.getContext("2d");

  let choice = $("#insulationOptions").find(":selected").text();

  if (choice == BARE) {
    context.fillStyle = "#d2cbcd";
    context.fillRect(0, 0, ADJ_CONTAINER_WIDTH, ADJ_CONTAINER_HEIGHT);
  } else if (choice == FINISH_ONLY) {
    context.fillStyle = "#d2cbcd";
    context.fillRect(0, 0, ADJ_CONTAINER_WIDTH, ADJ_CONTAINER_HEIGHT);
  } else if (choice == CELLULOSE) {
    context.fillStyle = "#e8e5e4";
    context.fillRect(0, 0, ADJ_CONTAINER_WIDTH, ADJ_CONTAINER_HEIGHT);
  } else if (choice == FIBERGLASS) {
    context.fillStyle = "#fec7d4";
    context.fillRect(0, 0, ADJ_CONTAINER_WIDTH, ADJ_CONTAINER_HEIGHT);
  } else if (choice == SPRAY_FOAM) {
    context.fillStyle = "#fdfaaa";
    context.fillRect(0, 0, ADJ_CONTAINER_WIDTH, ADJ_CONTAINER_HEIGHT);
  } else {
    context.fillStyle = "#d2cbcd";
    context.fillRect(0, 0, ADJ_CONTAINER_WIDTH, ADJ_CONTAINER_HEIGHT);
  }
}

/* This function draws the logo in the first block of the grid
   
  Tiffany Conrad (A00414194)
*/
function drawLogo() {
  let logo = document.getElementById("log");
  let context = logo.getContext("2d");

  context.font = "bold 30px Georgia";
  context.fillStyle = "blue";
  context.fillText("PROJECT XS", 50, 89);
}

/*
  This function processes input from the opaque Thickness slider and the window slider, then draws the canvases according to 
  the given values of sliders and insulation options

  @author Tiffany Conrad (A00414194)
*/
function processInput() {
  let construction = $("#opaqueThick").val();
  let constructionType = $("#insulationOptions option:selected").val();
  let window = $("#windowSlider").val();
  draw(construction, window);
}

/*
  This function draws the changes made by the Opaque Thickness Slider, as well as the window Slider.

  construction is the number value from the Opaque Thickness Slider
  window is the value from the Window slider

  @author Tiffany Conrad-- All drawings made on the plan Canvas
  @author
*/

function draw(construction, window) {
  let plan = document.getElementById("plan");
  let contextP = plan.getContext("2d");
  const DOOR_X = (plan.width * 2) / 3;
  const INIT_DOOR_Y = (178 * 3) / 4;
  const FIN_DOOR_Y = 178 * 27 * MAGNIFIER;
  contextP.clearRect(0, 0, plan.width, 178);

  // Slab
  contextP.fillStyle = "#d2cbcd";
  contextP.fillRect(0, 0, plan.width, 182);

  // Draw Door

  contextP.strokeStyle = "black";
  contextP.lineWidth = MAGNIFIER * 2;

  contextP.beginPath();
  contextP.setLineDash([0]);
  contextP.moveTo(DOOR_X, INIT_DOOR_Y);
  contextP.lineTo(DOOR_X, FIN_DOOR_Y);
  contextP.stroke();
  contextP.closePath();

  // Draw insulation
  changeInsulation();
  const END_RECT_Y = (178 * 3) / 4 - 2 * MAGNIFIER;
  //Draw outer wall
  contextP.setLineDash([0]);
  contextP.strokeStyle = "#3104fb";
  contextP.lineWidth = MAGNIFIER * 2;
  contextP.beginPath();
  contextP.strokeRect(
    MAGNIFIER,
    MAGNIFIER,
    plan.width - MAGNIFIER * 2,
    END_RECT_Y
  );
  contextP.closePath();

  // Inner Wall
  contextP.beginPath();
  contextP.fillStyle = "#d2cbcd";
  contextP.lineWidth = MAGNIFIER * 2;
  contextP.strokeStyle = "#3104fb";
  contextP.strokeRect(
    construction * MAGNIFIER + 4,
    construction * MAGNIFIER + 4,
    plan.width - 2 * construction * MAGNIFIER - 8,
    END_RECT_Y - 2 * construction * MAGNIFIER - Number(4)
  );

  // Draw door swing
  contextP.strokeStyle = "black";
  contextP.lineWidth = MAGNIFIER;
  contextP.beginPath();
  contextP.setLineDash([4, 3]);
  contextP.arc(DOOR_X, (178 * 3) / 4, 3 * 12 * MAGNIFIER, 0, Math.PI * 0.5);
  contextP.stroke();

  //Inner slab
  contextP.fillStyle = "#d2cbcd";
  contextP.beginPath();
  contextP.fillRect(
    construction * MAGNIFIER + 4,
    construction * MAGNIFIER + 4,
    plan.width - 2 * construction * MAGNIFIER - 8,
    END_RECT_Y - 2 * construction * MAGNIFIER - Number(4)
  );
  contextP.closePath();

  const PLACEMENT = (window / 2) * MAGNIFIER;

  // Draw Plan Window
  if (window >= 4) {
    contextP.lineWidth = MAGNIFIER;
    contextP.setLineDash([4, 3]);
    contextP.strokeStyle = "black";
    contextP.fillStyle = "#07ebf8";
    contextP.beginPath();
    contextP.fillRect(
      (plan.width / 3) * MAGNIFIER - PLACEMENT - 25,
      ((178 * 3) / 4 -
        Number(2 * MAGNIFIER) -
        2 * construction * MAGNIFIER -
        4 +
        ((178 * 3) / 4 - 2 * MAGNIFIER)) /
        2 +
        MAGNIFIER,
      Number(2 * PLACEMENT),
      construction * MAGNIFIER + Number(2 * MAGNIFIER)
    );
    contextP.closePath();

    // Top Dashed Line
    contextP.setLineDash([3, 4]);
    contextP.strokeStyle = "black";
    contextP.moveTo((plan.width / 3) * MAGNIFIER - PLACEMENT - 25,
     END_RECT_Y-construction*MAGNIFIER
    );
    contextP.lineTo(((plan.width / 3) * MAGNIFIER - PLACEMENT - 25) + Number(2 * PLACEMENT),
    END_RECT_Y-construction*MAGNIFIER
    );
    contextP.stroke();
    contextP.closePath();

    // Bottom Dashed Line
    contextP.setLineDash([3, 4]);
    contextP.strokeStyle = "black";
    contextP.moveTo((plan.width / 3) * MAGNIFIER - PLACEMENT - 25,
      END_RECT_Y
    );
    contextP.lineTo(((plan.width / 3) * MAGNIFIER - PLACEMENT - 25) + Number(2 * PLACEMENT),
    END_RECT_Y
    );
    contextP.stroke();
    contextP.closePath();
  }

  contextP.setLineDash([4, 3]);
  contextP.fillStyle = "#d2cbcd";
  contextP.beginPath();
  contextP.fillRect(
    DOOR_X,
    ((178 * 3) / 4 -
      Number(2 * MAGNIFIER) -
      2 * construction * MAGNIFIER -
      4 +
      ((178 * 3) / 4 - 2 * MAGNIFIER)) /
      2 +
      MAGNIFIER,
    3 * 12 * MAGNIFIER,
    construction * MAGNIFIER + Number(2 * MAGNIFIER) * 2
  );
  contextP.closePath();

  contextP.setLineDash([4, 3]);
  contextP.strokeStyle = "black";
  contextP.beginPath();
  // Top dashed line
  contextP.moveTo(
    DOOR_X,
    ((178 * 3) / 4 -
      Number(2 * MAGNIFIER) -
      2 * construction * MAGNIFIER -
      4 +
      ((178 * 3) / 4 - 2 * MAGNIFIER)) /
      2 +
      MAGNIFIER
  );
  contextP.lineTo(
    DOOR_X + 3 * 12 * MAGNIFIER,
    ((178 * 3) / 4 -
      Number(2 * MAGNIFIER) -
      2 * construction * MAGNIFIER -
      4 +
      ((178 * 3) / 4 - 2 * MAGNIFIER)) /
      2 +
      MAGNIFIER
  );

  // Bottom dashed line
  contextP.moveTo(
    DOOR_X,
    ((178 * 3) / 4 -
      Number(2 * MAGNIFIER) -
      2 * construction * MAGNIFIER -
      4 +
      ((178 * 3) / 4 - 2 * MAGNIFIER)) /
      2 +
      MAGNIFIER +
      construction * MAGNIFIER +
      2 * MAGNIFIER
  );
  contextP.lineTo(
    DOOR_X + 3 * 12 * MAGNIFIER,
    ((178 * 3) / 4 -
      Number(2 * MAGNIFIER) -
      2 * construction * MAGNIFIER -
      4 +
      ((178 * 3) / 4 - 2 * MAGNIFIER)) /
      2 +
      MAGNIFIER +
      construction * MAGNIFIER +
      2 * MAGNIFIER
  );
  contextP.stroke();
  contextP.closePath();
}

function setup() {
  drawLogo();
}

function drawLogo() {
  let logo = document.getElementById("log");
  let context = logo.getContext("2d");

  context.font = "bold 30px Georgia";
  context.fillStyle = "blue";
  context.fillText("PROJECT XS", 50, 89);
}
