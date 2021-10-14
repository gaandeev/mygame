var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var gameover,restart,gameoverimg,restartimg;


var bg, bgImg;
var bottomGround
var topGround
var balloon, balloonImg
var coinGroup,coinimg
var birdGroup,bird1img,bird2img,bird3img;


function preload(){
bgImg = loadImage("assets/bg.png")
bird1img = loadImage("assets/bird1.png");
bird2img = loadImage("assets/bird2.png");
bird3img = loadImage("assets/bird3.png");
coinimg = loadImage("assets/coin.png");
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
gameoverimg = loadImage("assets/gameover.png");
restartimg = loadImage("assets/restart.png");
}

function setup(){
createCanvas=(windowWidth,windowHeight);
//background image
bg = createSprite(400,400);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.setCollider('circle',0,0,180);
balloon.scale = 0.3;


birdGroup = new Group();
coinGroup = new Group();

score=0;

gameover = createSprite(200,180);
gameover.addImage(gameoverimg);

restart = createSprite(200,220);
restart.addImage(restartimg);

gameover.scale = 0.2;
restart.scale = 0.1;


}

function draw() {

  //background("black");
  
     //making the hot air balloon jump
if(gameState===PLAY){
          if(keyDown("up_arrow")) {
            balloon.velocityY = -4 ;
            
          }
        
          if(keyDown("down_arrow")) {
            balloon.velocityY = 4  ;
        
          }
        // add moving hot air balloon
        
        balloon.velocityX = balloon.velocityX + 00;


          if(keyDown("Right_arrow")) {
            balloon.VelocityX = 2 ;
        
          }
        
          if(keyDown("Left_arrow")){
            balloon.VelocityX = -2 ;
    }
    bg.velocityX=-4;
          if(bg.x<0){
            bg.x=bg.width/2
          }


          //adding gravity
           balloon.velocityY = balloon.velocityY + 0.8;
           if(coinGroup.isTouching(balloon)){
             coinGroup.destroyEach();
             score=score+1;
           }

           spawnBirds();
           spawnCoin();
           if(birdGroup.isTouching(balloon)){
            gameState = END;
        }
        }

        else if (gameState === END) {
        //  gameOver.visible = true;
          //restart.visible = true;
          
          //set velcity of each game object to 0
          bg.velocityX = 0;
          balloon.velocityY = 0;
          birdGroup.setVelocityXEach(0);
          coinGroup.setVelocityXEach(0);
          
          //change the trex animation
         // trex.changeAnimation("collided",trex_collided);
          
          //set lifetime of the game objects so that they are never destroyed
          birdGroup.setLifetimeEach(-1);
          coinGroup.setLifetimeEach(-1);
          
          //if(mousePressedOver(restart)) {
            //reset();
          //}
        }
        

        drawSprites();
        textSize(15);
  fill("black");
  text("Score: "+ score, 30,50);
        
}

function spawnBirds() {
  if(frameCount % 80 === 0) {
    var bird = createSprite(600,120,40,10);
    bird.y = Math.round(random(40,120));
    //obstacle.debug = true;
    bird.velocityX = -3 ;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: bird.addImage(bird1img);
              break;
      case 2:  bird.addImage(bird2img);
              break;
      case 3:  bird.addImage(bird3img);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    bird.scale = 0.2;
    bird.lifetime = 300;
    //add each obstacle to the group
    birdGroup.add(bird);
  }
}

function spawnCoin() {
  if(frameCount % 160 === 0) {
    var  coin = createSprite(600,120,40,10);
    coin.y = (120,350);
    coin.addImage(coinimg);
    coin.velocityX = -2 ;
    coin.scale = 0.05;
    coin.lifetime = 300;
    coinGroup.add(coin);

  }
}






