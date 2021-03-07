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
the selected insulation option*/
function changeInsulation(obj, context) {
  let choice = $("#insulationOptions").find(":selected").text();
  //Needs to be coordinated with thickness slider
  let thickness = slider.getValue();
  let insulationThickness = thickness * MAGNIFIER;

  if (choice == BARE) {
    context.fillStyle = "";
  } else if (choice == FINISH_ONLY) {
    context.fillStyle = "#e8e5e4";
    //drawing four little rectangles around perimeter
    //Top and bottom
    context.fillRect(0, 0, ADJ_CONTAINER_WIDTH, insulationThickness);
    context.fillRect(
      0,
      ADJ_CONTAINER_HEIGHT - insulationThickness,
      ADJ_CONTAINER_WIDTH,
      insulationThickness
    );
    //Sides
    context.fillRect(0, 0, insulationThickness, ADJ_CONTAINER_HEIGHT);
    context.fillRect(
      ADJ_CONTAINER_WIDTH - insulationThickness,
      0,
      insulationThickness,
      ADJ_CONTAINER_HEIGHT
    );
  } else if (choice == CELLULOSE) {
    context.fillStyle = "#fec7d4";
    //drawing four little rectangles around perimeter
    //Top and bottom
    context.fillRect(0, 0, ADJ_CONTAINER_WIDTH, insulationThickness);
    context.fillRect(
      0,
      ADJ_CONTAINER_HEIGHT - insulationThickness,
      ADJ_CONTAINER_WIDTH,
      insulationThickness
    );
    //Sides
    context.fillRect(0, 0, insulationThickness, ADJ_CONTAINER_HEIGHT);
    context.fillRect(
      ADJ_CONTAINER_WIDTH - insulationThickness,
      0,
      insulationThickness,
      ADJ_CONTAINER_HEIGHT
    );
  } else if (choice == FIBERGLASS) {
    context.fillStyle = "#fdfaaa";
    //drawing four little rectangles around perimeter
    //Top and bottom
    context.fillRect(0, 0, ADJ_CONTAINER_WIDTH, insulationThickness);
    context.fillRect(
      0,
      ADJ_CONTAINER_HEIGHT - insulationThickness,
      ADJ_CONTAINER_WIDTH,
      insulationThickness
    );
    //Sides
    context.fillRect(0, 0, insulationThickness, ADJ_CONTAINER_HEIGHT);
    context.fillRect(
      ADJ_CONTAINER_WIDTH - insulationThickness,
      0,
      insulationThickness,
      ADJ_CONTAINER_HEIGHT
    );
  } else if (choice == SPRAY_FOAM) {
    context.fillStyle = "#e8e5e4";
    //drawing four little rectangles around perimeter
    //Top and bottom
    context.fillRect(0, 0, ADJ_CONTAINER_WIDTH, insulationThickness);
    context.fillRect(
      0,
      ADJ_CONTAINER_HEIGHT - insulationThickness,
      ADJ_CONTAINER_WIDTH,
      insulationThickness
    );
    //Sides
    context.fillRect(0, 0, insulationThickness, ADJ_CONTAINER_HEIGHT);
    context.fillRect(
      ADJ_CONTAINER_WIDTH - insulationThickness,
      0,
      insulationThickness,
      ADJ_CONTAINER_HEIGHT
    );
  } else {
    context.fillStyle = "#db2cbcd";
    //drawing four little rectangles around perimeter
    //Top and bottom
    context.fillRect(0, 0, ADJ_CONTAINER_WIDTH, insulationThickness);
    context.fillRect(
      0,
      ADJ_CONTAINER_HEIGHT - insulationThickness,
      ADJ_CONTAINER_WIDTH,
      insulationThickness
    );
    //Sides
    context.fillRect(0, 0, insulationThickness, ADJ_CONTAINER_HEIGHT);
    context.fillRect(
      ADJ_CONTAINER_WIDTH - insulationThickness,
      0,
      insulationThickness,
      ADJ_CONTAINER_HEIGHT
    );
  }
  //Call function to redraw walls over rectangles
}
