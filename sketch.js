var backImage,back;
var monkey, monkey_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;
var gameState="play";

function preload(){
  backImage=loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
   bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  game=loadImage("gameEnd.png");
  
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  back=createSprite(0,0,displayWidth,displayHeight);
  back.addImage(backImage);
  back.scale=3;
  back.x=back.width/2;
  back.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;

  gameOver = createSprite(displayWidth/2,displayHeight/2);
  gameOver.addImage("gameOver",game)
  gameOver.visible=false;
  ground = createSprite(displayWidth/2,displayHeight-150,displayWidth,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 1;
 
}

function draw() {
  
  background(255);
  if (gameState==="play") {

  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(back.x<100){
    back.x=back.width/2;
  }
  if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
  if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
  spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
        score=score-2;
    }
    camera.position.x=monkey.x;
    camera.position.y=monkey.y;
    if (score<=0) {
      gameState="end";
    }
  }
  else if (gameState==="end") {
    monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    score=0;
    gameOver.visible=true;
  }
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(displayWidth,250,40,10);
    banana.y = random(displayHeight/2,displayHeight/3);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(displayWidth,displayHeight-200,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
