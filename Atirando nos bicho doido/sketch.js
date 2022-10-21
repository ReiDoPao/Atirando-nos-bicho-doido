var bg,bgImg;
var player, shooterImg, shooter_shooting;

var PLAY = 0;
var END = 1;
var WIN = 2;
var gameState = PLAY;

var monstro;
var zumbiImg, bicho2Img, bicho3Img, bicho4Img;
var monstrosGroup;

var vida = 3;
var coreichon1, coreichon2, coreichon3;
var coreichon1Img, coreichon2Img, coreichon3Img;
var score = 0;
var bala;
var balas;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zumbiImg = loadImage("assets/zombie.png");

  coreichon1Img = loadImage("assets/heart_1.png");
  coreichon2Img = loadImage("assets/heart_2.png");
  coreichon3Img = loadImage("assets/heart_3.png");

  bgImg = loadImage("assets/bg.jpeg");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
bg.addImage(bgImg);
bg.scale = 1.1;
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg);
   player.scale = 0.3;
   player.debug = true;
   player.setCollider("rectangle",0,0,300,300);

//vidas

coreichon1 = createSprite(displayWidth-263, displayHeight-700, 40,40);
coreichon1.addImage(coreichon1Img);
coreichon1.scale = 0.3;
coreichon1.visible = false;

coreichon2 = createSprite(displayWidth-230, displayHeight-700, 40,40);
coreichon2.addImage(coreichon2Img);
coreichon2.scale = 0.3;
coreichon2.visible = false;

coreichon3 = createSprite(displayWidth-200, displayHeight-700, 40,40);
coreichon3.addImage(coreichon3Img);
coreichon3.scale = 0.3;




balas = new Group();
monstrosGroup = new Group();   


}

function draw() {
  background(0); 


  
if (gameState === PLAY){

  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(balas.isTouching(monstrosGroup)){
for(var i = 0;i < monstrosGroup.length; i++){
  if(balas.isTouching(monstrosGroup[i])){
  monstrosGroup[i].destroy();
  balas.destroyEach();
  score = score + 1;
  }
}  
}

if(monstrosGroup.isTouching(player)){
  console.log("ai!") 
  for(var i = 0;i < monstrosGroup.length; i++){
    if (monstrosGroup[i].isTouching(player)){
    monstrosGroup[i].destroy();
    vida -= 1;
    }
  }
}

if (vida === 3){
  coreichon3.visible = true;
  coreichon2.visible = false;
  coreichon1.visible = false;
}
if (vida === 2){
  coreichon3.visible = false;
  coreichon2.visible = true;
  coreichon1.visible = false;
}

if (vida === 1){
  coreichon3.visible = false
  coreichon2.visible = false;
  coreichon1.visible = true;
}

if (vida === 0){
  coreichon3.visible = false;
  coreichon2.visible = false;
  coreichon1.visible = false;
  gameState = END;
}



createMonsters();
shot();


}

if (gameState === END){

  textSize(100);
  stroke("purple");
  fill("green");
  text("You lose :(", displayWidth/2, displayHeight/2);

  monstrosGroup.setVelocityXEach(0); 
  player.destroy();

}

/*if (gameState === WIN){
  textSize(100);
  fill("yellow");
  stroke("red");
  text("You Win :)", displayWidth/2, displayHeight/2);

 monstrosGroup.destroyEach();
}*/
  






drawSprites();

console.log(vida);
console.log(gameState);

  stroke("black");
  fill("white");
  textSize(30);
  text("Zumbis Derrotados:" + score,60,110);


}

function shot (){

  //solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
if(keyWentDown("space")){
  bala = createSprite(player.x + 10, player.y - 10,8,8);
  bala.velocityX = 50;
  balas.add(bala);
  player.depth = bala.depth;
  player.depth += 2;
  player.addImage(shooter_shooting);
 
}

//o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
  
}





}
function createMonsters(){

  if (frameCount % 100 === 0){
  monstro = createSprite (random(900,1300),random(100,600),50,50);
  monstro.velocityX = -5.5;
  monstro.addImage(zumbiImg);
  monstro.scale = 0.17;
  monstro.setCollider("rectangle",0,0,400,700);
  monstro.debug = true;
  monstro.lifetime = 400;
  monstrosGroup.add(monstro);
  }

}

