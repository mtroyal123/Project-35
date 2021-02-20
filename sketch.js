var database = firebase.database();
var balloon, balloonImage;
var cityImage;
var balloonPosition = database.ref('balloon/Position');
balloonPosition.on("value", readPosition, showError);

function preload(){
cityImage= loadImage("Hot-Air-Balloon-01.png");
balloonImage = loadAnimation("Hot-Air-Balloon-02.png","Hot-Air-Balloon-03.png", "Hot-Air-Balloon-04.png");
}

function setup() {
  createCanvas(820,500);

  balloon = createSprite(20,50);
  balloon.addAnimation("hotAirBalloon",balloonImage);
  balloon.scale = 0.5;
}

function draw() {
  background(cityImage);  
  if (keyDown(LEFT_ARROW)){
    updateHeight(-10, 0);
    balloon.x = balloon.x -10;
  }
  else if (keyDown(RIGHT_ARROW)){
    updateHeight(+10, 0);
    balloon.x = balloon.x +10;
   // console.log(balloon.x);
  }
  else if (keyDown(UP_ARROW)){
    updateHeight(0, -10);
    balloon.y = balloon.y - 10;
    //console.log(balloon.y);
    balloon.scale = balloon.scale - 0.01;
  }
  else if (keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.y = balloon.y + 10;
    balloon.scale = balloon.scale + 0.01;
  }

  textSize(20);
  fill("black");
  strokeWeight(1.1);
  text("**Use arrow keys to move the hot air balloon", 30, 40 );
  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/Position').set({
    'x': Position.x + x,
    'y': Position.y+y
  })
}

function readPosition(data){
    Position = data.val();
    balloon.x = Position.x;
    balloon.y = Position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
