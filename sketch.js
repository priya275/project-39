var bow , arrow,  background1, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var gameState=PLAY;
var PLAY=1;
var END=0;

function preload(){
  
  backgroundImage = loadImage("background0.png");
  gameoverImg=loadImage("gameover.jpg");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  
}



function setup() {
  createCanvas(displayWidth,displayHeight-144);
  
  //creating background
  background1= createSprite(0,0,600,600);
  background1.addImage(backgroundImage);
  background1.scale = 2.5
  gameover=createSprite(250,200,20,20);
  gameover.addImage(gameoverImg);
  gameover.visible=false;
  gameover.scale=0.5;
  // creating bow to shoot arrow
  bow = createSprite(480,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
   score = 0  
  redB= new Group();
  greenB= new Group();
  blueB= new Group();
  pinkB= new Group();
  arrowGroup= new Group();
 
  
}

function draw() {
background(0);
  // moving ground
    background1.velocityX = -3 

    if (background1.x < 150){
      background1.x = background1.width/2;
    }
  camera.position.x=displayWidth/2;
  //moving bow
  bow.y = World.mouseY
  
   // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
    
  }
  
  //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }
  
  if (arrowGroup.isTouching(redB)) {
  redB.destroyEach();
  arrowGroup.destroyEach();
    score=score+1;
}




 if (arrowGroup.isTouching(greenB)) {
  greenB.destroyEach();
  arrowGroup.destroyEach();
  score=score+3;
}



 if (arrowGroup.isTouching(blueB)) {
  blueB.destroyEach();
  arrowGroup.destroyEach();
  score=score+2;
}



if (arrowGroup.isTouching(pinkB)) {
  pinkB.destroyEach();
  arrowGroup.destroyEach();
  score=score+1;
}
if(blueB.isTouching(bow)){
 gameState=END;
}
  //if(pinkB.isTouching(bow)){
 //gameState=END;
//}
  if(greenB.isTouching(bow)){
 gameState=END;
}
  if(redB.isTouching(bow)){
 gameState=END;
}
  if(gameState===END){
    redB.setVelocityXEach(0);
    greenB.setVelocityXEach(0);
    pinkB.setVelocityXEach(0);
    blueB.setVelocityXEach(0);
    background1.velocityX=0;
    pinkB.setLifetimeEach(-1);
    blueB.setLifetimeEach(-1);
     greenB.setLifetimeEach(-1);
     redB.setLifetimeEach(-1);
    redB.destroyEach();
    greenB.destroyEach();
    blueB.destroyEach();
    pinkB.destroyEach();
    bow.destroy();
   gameover.visible=true;
  }
  drawSprites();
    text("Score: "+ score, 500,50);
}


function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
   //camera.position.x=displayWidth;
  red.lifetime = 300;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
   //camera.position.x=displayWidth;
  blue.velocityX = 3;
  blue.lifetime = 300;
  blue.scale = 0.1;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  //camera.position.x=displayWidth;
  
  green.lifetime = 300;
  green.scale = 0.1;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
   //camera.position.x=displayWidth;
  pink.lifetime = 300;
  pink.scale = 1;
  pinkB.add(pink);
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
   
}


