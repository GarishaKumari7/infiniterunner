var straberryGirl;
var strawberry;
var path 
var cactus;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  strawberryGirlImg= loadImage("Strawberry_Shortcake.we");
  strawberryImg= loadImage("strawberry image.png");
  gameOverImg = loadImage("Neon game over.png");
  cactusImg = loadImage("cactus.png");
  girlrunningImg= loadImage("girlrunning.png");
  DesertImg= loadImage("Desert.png");
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,height/2);
path.addImage(DesertImg);
path.velocityY = -2;

//creating girl running
strawberryGirl = createSprite(70,150);
strawberryGirl.addImage("girlrunning",strawberryImg);
strawberryGirl.scale=0.07;
  
//colider for girl
strawberryGirl.setCollider("rectangle",0,0,40,40);

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  

cactiiGroup= new Group()
}


function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   strawberryGirl.y = World.mouseY;
  
   edges= createEdgeSprites();
   strawberryGirl.collide(edges);
  
   spawnCactus()

    //code to reset the background
    if(path.x < 0 ){
      path.x = width/2;
    }
  
  

  
   if(strawberryGirl.isTouching(cactiiGroup)){
     gameState = END;
    }
    
  }
  if (gameState === END) {
      gameOver.visible = true;
      cactiiGroup.setVelocityYEach (0);
      textSize(20);
      fill(255);
      text("💗!Press Up Arrow to Restart the game!💗", 500,200);
    
      
      
      if(keyDown("UP_ARROW")) {
        reset();
      }
  }

}

function spawnCactus(){
  if( World.frameCount % 60===0){
    cactus= createSprite(1200,250);
    cactus.addImage("cactus",cactusImg);
    cactus.velocityY= -3
    cactiiGroup.add(cactus)
    cactus.scale= 0.1
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  strawberryGirl.addAnimation("girlrunning.png",strawberryGirlImg);

  distance = 0
 }

