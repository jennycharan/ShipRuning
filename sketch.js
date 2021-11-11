var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg,restartimg;
var water, ship, helicopter, bomb;
var helicopterGroup, bombGroup;
var score = 0;



function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadImage("ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  restartimg=loadImage("gameOver.png")
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
  water=createSprite(400,350)
  water.addImage(waterbg)
  water.velocityX=-2;
 
 
  
  
  //creating ship
  ship= createSprite(100,330)
  ship.addImage(shipimg)
  ship.scale=0.25
 
  
  //creating helicopter group
  helicopterGroup= new Group()


  //creating bomb group
  bombGroup= new Group()
    

  //ship.debug = "true";

}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
    
  //gameState play
  if(gameState === PLAY){
    //increase score
    score = score + Math.round(frameCount/300);

    if(keyDown(LEFT_ARROW)){
      ship.x=ship.x-2;
    }
    if(keyDown(RIGHT_ARROW)){
      ship.x=ship.x+2;
    }

    
    //Call user defined function
   
    
    if(bombGroup.isTouching(ship)){
       gameState = END;
    }
    spawnHelicopter()
    spawnBomb()
    
  }
  
  //gameState end
  else if(gameState === END){
    ship.addImage(restartimg)
    
   //water velocity becomes zero
   water.velocityX=0;

   //destroy Helicopter group
   helicopterGroup.destroyEach();

   //destroy bomb group
   bombGroup.destroyEach();
    
  
    
  }
  
 
 //for infinite background 
 if(water.position.x < 300){
    water.position.x = 400;
    }
    
  
  drawSprites();
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);
  }
}

function spawnBomb(){
 // create bombs at random position
 //use Math.random
 if(frameCount%200 === 0){
  bomb = createSprite(800,80,200,50);
  bomb.addImage("bomb",bombimg);
  bomb.x=Math.round(random(100,700))
  console.log(bomb.x)
  bomb.setVelocity(0,5);
  
  bomb.scale = 0.15;
  
  bombGroup.add(bomb);
}
}




