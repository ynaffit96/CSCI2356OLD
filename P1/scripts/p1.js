// scale factor
const SCL = 1.35;

function setup(){
    drawLogo();
    drawPlan();
}



function drawLogo(){
    let logo = document.getElementById("log");
    let context = logo.getContext("2d");

    context.font = "bold 30px Georgia";
    context.fillStyle="blue";
    context.fillText("PROJECT XS",50,89);
}

function drawPlan(){
    let plan = document.getElementById("plan");
    let context = plan.getContext("2d");

    context.clearRect(0,0,plan.width,plan.height);

    // Slab
    context.fillStyle = "#d2cbcd";
    context.fillRect(0,0,plan.width,plan.height);

    // Outer Wall
    context.strokeStyle = "#3104fb";
    context.lineWidth = 2 * SCL;
    context.strokeRect(0,0,plan.width, parseFloat((plan.height*4/5)-(7*SCL)));
    
    

    // Draw the door
    context.strokeStyle = "black";
    context.lineWidth = Number(3*SCL);
    context.beginPath();
    context.moveTo((plan.width-(7*SCL)-(3*12*SCL)*2),(plan.height*4/5)-(7*SCL)-2);
    context.lineTo((plan.width-(7*SCL)-(3*12*SCL)*2),plan.height*4/5-(7*SCL)+(3*12*SCL)-5.5);
    context.stroke();

    /* TODO Draw door opening
    context.strokeStyle = "black";
    context.fillStyle="#d2cbcd" 
    context.setLineDash([3,4]);
    context.lineWidth = SCL;
    context.strokeRect()
    */

    // Draw door swing
    context.setLineDash([3,4]);
    context.lineWidth = SCL;
    context.beginPath();
    context.arc((plan.width-(7*SCL)-(3*12*SCL)*2),(plan.height*4/5)-(7*SCL)-2,(3*12*SCL),0,0.5*Math.PI);
    context.stroke();

    // Window
    let window = $("#windowSlider").val();
    context.fillStyle = "#07ebf8";


    
}