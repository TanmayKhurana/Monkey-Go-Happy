var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gamestate;
var score=0;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");

}

function setup() {
  createCanvas(1000,400);
  
  backgr=createSprite(0,0,1000,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
    
  gamestate = "play";

  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
  if (gamestate==="play"){
 
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<0){
    backgr.x=backgr.width/2;
  }
  

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 1;
      player.scale = player.scale+0.1;
    }
    switch(score){
        case 6: player.scale=0.12;
                break;
        case 12: player.scale=0.14;
                break;
        case 18: player.scale=0.16;
                break;
        case 24: player.scale=0.18;
                break;
        case 30: player.scale=0.20;
                break;
        default: break;
    }
  
}
  
  if (score<=-1){
    gamestate = "end"
  }
  
  if (gamestate==="end"){
    stroke("black")
    textSize(20)
    fill("black")
    text("Thanks for playing", 400, 200)
    obstaclesGroup.destroyEach()
    FoodGroup.destroyEach()
    score=0
  }
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
        player.scale= player.scale-0.2;
      obstaclesGroup.destroyEach()
      score = score-2;
     // score=score-1;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 110 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(100,50);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(800,340,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
