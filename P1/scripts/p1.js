
function init() {

  $("#windowSlider").on("change", function () {
    processInput();
  });

  $("#opaqueThick").on("change", function () {
    processInput();
  });

  let construction = $("#opaqueThick").val();
  let constructionType = $("#insulationOptions option:selected").val();
  let window = $("#windowSlider").val();
  draw(construction,window);
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

/*Selects the appropriate color to represent
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
    context.fillStyle = "#e8e5e4";
    context.fillRect(0, 0, ADJ_CONTAINER_WIDTH, ADJ_CONTAINER_HEIGHT);
  } else if (choice == CELLULOSE) {
    context.fillStyle = "#fec7d4";
    context.fillRect(0, 0, ADJ_CONTAINER_WIDTH, ADJ_CONTAINER_HEIGHT);
  } else if (choice == FIBERGLASS) {
    context.fillStyle = "#fdfaaa";
    context.fillRect(0, 0, ADJ_CONTAINER_WIDTH, ADJ_CONTAINER_HEIGHT);
  } else if (choice == SPRAY_FOAM) {
    context.fillStyle = "#07ebf8";
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

  contextP.clearRect(0, 0, plan.width, 178);

  // Slab
  contextP.fillStyle = "#d2cbcd";
  contextP.fillRect(0, 0, plan.width, 182);

  //Draw outer wall
  contextP.strokeStyle = "#3104fb";
  contextP.lineWidth = MAGNIFIER * 2;
  contextP.strokeRect(
    MAGNIFIER,
    MAGNIFIER,
    plan.width - MAGNIFIER * 2,
    (178 * 3) / 4 - 2 * MAGNIFIER
  );

  // Draw Door
  contextP.strokeStyle = "black";
  contextP.lineWidth = MAGNIFIER * 2;
  contextP.beginPath();
  contextP.moveTo((plan.width * 2) / 3, (178 * 3) / 4);
  contextP.lineTo((plan.width * 2) / 3, 178 * 27 * MAGNIFIER);
  contextP.stroke();

  // Draw door swing
  contextP.strokeStyle = "black";
  contextP.lineWidth = MAGNIFIER;
  contextP.beginPath();
  contextP.setLineDash([4, 3]);
  contextP.arc(
    (plan.width * 2) / 3,
    (178 * 3) / 4,
    3 * 12 * MAGNIFIER,
    0,
    Math.PI * 0.5
  );
  contextP.stroke();

  // TODO Draw insulation HERE

  // Inner Wall
  contextP.beginPath();
  contextP.setLineDash([0]);
  contextP.fillStyle="#d2cbcd"
  contextP.lineWidth = MAGNIFIER * 2;
  contextP.strokeStyle = "#3104fb";
  contextP.strokeRect(
    construction*MAGNIFIER+4,
    construction*MAGNIFIER+4,
    plan.width-2*construction*MAGNIFIER-8,
    ((178 * 3) / 4 - 2 * MAGNIFIER) - 2 * construction * MAGNIFIER - Number(4)
  );

  $("#opaqueThickness").on("change", function () {
    processInput();
  });

  

  // Draw Plan Window
  if(window >= 4){
  contextP.fillStyle = "#07ebf8";
  contextP.fillRect( 
    (plan.width/3 * MAGNIFIER - Number(window/2) * MAGNIFIER)-25,
    ((((178 * 3) / 4 - 2 * MAGNIFIER) - 2 * construction * MAGNIFIER - Number(4))+((178 * 3) / 4 - 2 * MAGNIFIER))/2+MAGNIFIER,
    2*Number(window/2*MAGNIFIER),
    construction*MAGNIFIER+Number(2*MAGNIFIER)
    );
  }

  

  $("#windowSlider").on("change", function () {
    processInput();
  });
}


function setup() {
  drawLogo();
  drawPlan();
}

function drawLogo() {
  let logo = document.getElementById("log");
  let context = logo.getContext("2d");

  context.font = "bold 30px Georgia";
  context.fillStyle = "blue";
  context.fillText("PROJECT XS", 50, 89);
}

function drawPlan() {
  let plan = document.getElementById("plan");
  let context = plan.getContext("2d");

  context.clearRect(0, 0, plan.width, plan.height);

  // Slab
  context.fillStyle = "#d2cbcd";
  context.fillRect(0, 0, plan.width, plan.height);

  // Outer Wall
  context.strokeStyle = "#3104fb";
  context.lineWidth = 2 * SCL;
  context.strokeRect(
    0,
    0,
    plan.width,
    parseFloat((plan.height * 4) / 5 - 7 * SCL)
  );

  // Draw the door
  context.strokeStyle = "black";
  context.lineWidth = Number(3 * SCL);
  context.beginPath();
  context.moveTo(
    plan.width - 7 * SCL - 3 * 12 * SCL * 2,
    (plan.height * 4) / 5 - 7 * SCL - 2
  );
  context.lineTo(
    plan.width - 7 * SCL - 3 * 12 * SCL * 2,
    (plan.height * 4) / 5 - 7 * SCL + 3 * 12 * SCL - 5.5
  );
  context.stroke();

  /* TODO Draw door opening
    context.strokeStyle = "black";
    context.fillStyle="#d2cbcd" 
    context.setLineDash([3,4]);
    context.lineWidth = SCL;
    context.strokeRect()
    */

  // Draw door swing
  context.setLineDash([3, 4]);
  context.lineWidth = SCL;
  context.beginPath();
  context.arc(
    plan.width - 7 * SCL - 3 * 12 * SCL * 2,
    (plan.height * 4) / 5 - 7 * SCL - 2,
    3 * 12 * SCL,
    0,
    0.5 * Math.PI
  );
  context.stroke();

  // Window
  let window = $("#windowSlider").val();
  context.fillStyle = "#07ebf8";
}

