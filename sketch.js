var caminho,imgCaminho;
var jogador1,jogador2,jogador3;
var imgCaminho,img1CiclistaPrincipal,img2CiclistaPrincipal;

var opRosaimg1,opRosaimg2;
var opAmareloimg1,opAmareloimg2;
var opVermelhoimg1,opVermelhoimg2;
var imgFimJogo,sinoBicicleta;

var CGRosa, CGAmarelo,CGVermelho; 

var barreira1,barreira2

var ENCERRAMENTO =0;
var JOGAR =1;
var estadoJogo = JOGAR;

var distancia=0;
var fimdeJogo, recomecar;

var obstaculo,imgObstaculos;
var obstaculo1,imgObstaculos1;

function preload(){
  imgObstaculos1 = loadImage("images/obstacle2.png")
  imgObstaculos = loadImage("images/obstacle1.png")
  imgCaminho = loadImage("images/Road.png");
  img1CiclistaPrincipal = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  img2CiclistaPrincipal= loadAnimation("images/mainPlayer3.png");
  
  opRosaimg1 = loadAnimation("images/opponent1.png","images/opponent2.png");
  opRosaimg2 = loadAnimation("images/opponent3.png");
  
  opAmareloimg1 = loadAnimation("images/opponent4.png","images/opponent5.png");
  opAmareloimg2 = loadAnimation("images/opponent6.png");
  
  opVermelhoimg1 = loadAnimation("images/opponent7.png","images/opponent8.png");
  opVermelhoimg2 = loadAnimation("images/opponent9.png");
  
  sinoBicicleta = loadSound("sound/bell.mp3");
  imgFimJogo = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(1920,937);
// movendo o plano de fundo
caminho=createSprite(100,150);
caminho.addImage(imgCaminho);
caminho.velocityX = -5;

//criando o ciclista correndo de bicicleta
ciclistaPrincipal  = createSprite(70,150);
ciclistaPrincipal.addAnimation("SahilRunning",img1CiclistaPrincipal);
ciclistaPrincipal.scale=0.07;

  
//definir collider para o ciclista
ciclistaPrincipal.setCollider("circle",100,0,770) ; 
ciclistaPrincipal.debug = false; 
  
fimdeJogo = createSprite(960,100);
fimdeJogo.addImage(imgFimJogo);
fimdeJogo.scale = 2;
fimdeJogo.visible = false;  
  
CGRosa = new Group();
CGAmarelo = new Group();
CGVermelho = new Group();

barreira1 = createSprite(960,-268,1920,100);
barreira2 = createSprite(960,568,1920,100)
  
}

function draw() {


  background(0);

  drawSprites();
  
  if(estadoJogo===JOGAR){
 
    
   if(distancia <= 2000){
     distancia = distancia + Math.round(getFrameRate()/50);
     textSize(30);
     fill(255);
     text("Distancia: "+ distancia,1700,-100);
   }
        caminho.velocityX = -(6 + 2*distancia/150);
  if(keyCode === UP_ARROW){
    ciclistaPrincipal.y -= 3
  }
  if(keyCode === DOWN_ARROW){
    ciclistaPrincipal.y += 3
  }
   
   camera.position.y = ciclistaPrincipal.y
   
  

  //código para resetar o plano de fundo
  if(caminho.x < 0 ){
    caminho.x = width/2;
  }
  
    //código para tocar o som do sino da bicicleta
  if(keyDown("space")) {
    sinoBicicleta.play();
  }
  ciclistaPrincipal.collide(barreira1);
  ciclistaPrincipal.collide(barreira2);

  if(distancia >= 2000){
    ciclistaPrincipal.visible = false
    CGRosa.destroyEach();
    CGAmarelo.destroyEach();
    CGVermelho.destroyEach();
    CGRosa.setVelocityXEach(0);
    CGRosa.setLifetimeEach(-1);
  
    CGAmarelo.setVelocityXEach(0);
    CGAmarelo.setLifetimeEach(-1);
  
    CGVermelho.setVelocityXEach(0);
    CGVermelho.setLifetimeEach(-1);

    caminho.velocityX = 0

    textSize(50);
    fill(0);
    text("Voce Venceu",750,-20);
    text("Parabens voce atingiu 2000 metros percorridos",450,20);
    camera.position.y = 150
  }
  
  //criando oponentes continuos
  var selecionar_jogadorOP = Math.round(random(1,5));
  var selecionar_jogadorOP1 = Math.round(random(1,5));
  
  if (World.frameCount % 150 == 0) {
    if (selecionar_jogadorOP == 1) {
      ciclistaRosa();
    } else if (selecionar_jogadorOP == 2) {
      ciclistaAmarelo();
    } else if(selecionar_jogadorOP == 3){
      ciclistaVermelho();
    }else if(selecionar_jogadorOP1 == 4){
      obstaculos();
    }else{
      obstaculos1();
    }
  }
  if (World.frameCount % 250 == 0) {
    if (selecionar_jogadorOP1 == 1) {
      ciclistaRosa();
    } else if (selecionar_jogadorOP1 == 2) {
      ciclistaAmarelo();
    } else if(selecionar_jogadorOP1 == 3){
      ciclistaVermelho();
    }else if(selecionar_jogadorOP1 == 4){
      obstaculos();
    }else{
      obstaculos1();
    }
  }
  
   if(CGRosa.isTouching(ciclistaPrincipal)){
     estadoJogo = ENCERRAMENTO;
     jogador1.velocityY = 0;
     jogador1.addAnimation("opponentPlayer1",opRosaimg2);
    }
    
    if(CGAmarelo.isTouching(ciclistaPrincipal)){
      estadoJogo = ENCERRAMENTO;
      jogador2.velocityY = 0;
      jogador2.addAnimation("opponentPlayer2",opAmareloimg2);
    }
    
    if(CGVermelho.isTouching(ciclistaPrincipal)){
      estadoJogo = ENCERRAMENTO;
      jogador3.velocityY = 0;
      jogador3.addAnimation("opponentPlayer3",opVermelhoimg2);
      
    }

}else if (estadoJogo === ENCERRAMENTO) {
    fimdeJogo.visible = true;
    camera.position.y = 150
    ciclistaPrincipal.addAnimation("SahilRunning",img2CiclistaPrincipal);
  
    //Adicione o código para mostrar instruções de reinicialização do jogo em texto aqui
    textSize(50);
  text("Aperte a tecla direcional para a direita para reiniciar o jogo!",250,210);
  
    caminho.velocityX = 0;
    imgCaminho.velocityY = 0;
 
  
    CGRosa.setVelocityXEach(0);
    CGRosa.setLifetimeEach(-1);
  
    CGAmarelo.setVelocityXEach(0);
    CGAmarelo.setLifetimeEach(-1);
  
    CGVermelho.setVelocityXEach(0);
    CGVermelho.setLifetimeEach(-1);

    //condição de gravação para chamada de reset()
    if(keyDown(RIGHT_ARROW)){
       reiniciar();
       }
}

}

function ciclistaRosa(){
        jogador1 =createSprite(2000,Math.round(random(-150, 500)));
        jogador1.scale =0.06;
        jogador1.velocityX = -(6 + 2*distancia/150);
        jogador1.addAnimation("opponentPlayer1",opRosaimg1);
        jogador1.setLifetime=170;
        CGRosa.add(jogador1);
}

function ciclistaAmarelo(){
        jogador2 =createSprite(2000,Math.round(random(-150, 500)));
        jogador2.scale =0.06;
        jogador2.velocityX = -(6 + 2*distancia/150);
        jogador2.addAnimation("opponentPlayer2",opAmareloimg1);
        jogador2.setLifetime=170;
        CGAmarelo.add(jogador2);
}

function ciclistaVermelho(){
        jogador3 =createSprite(2000,Math.round(random(-150, 500)));
        jogador3.scale =0.06;
        jogador3.velocityX = -(6 + 2*distancia/150);
        jogador3.addAnimation("opponentPlayer3",opVermelhoimg1);
        jogador3.setLifetime=170;
        CGVermelho.add(jogador3);
}
function obstaculos(){
  obstaculo =createSprite(2000,Math.round(random(-150, 500)));
  obstaculo.scale =0.1;
  obstaculo.velocityX = -(6 + 2*distancia/150);
  obstaculo.addAnimation("imagemObstaculos",imgObstaculos);
  obstaculo.setLifetime=170;
  CGVermelho.add(obstaculo);
}
function obstaculos1(){
  obstaculo1 =createSprite(2000,Math.round(random(-150, 500)));
  obstaculo1.scale =0.1;
  obstaculo1.velocityX = -(6 + 2*distancia/150);
  obstaculo1.addAnimation("imagemObstaculos1",imgObstaculos1);
  obstaculo1.setLifetime=170;
  CGVermelho.add(obstaculo1);
}


// criar função de redefinição aqui

function reiniciar(){
  estadoJogo = JOGAR;
  fimdeJogo.visible = false;
  CGRosa.destroyEach();
  CGVermelho.destroyEach();
  CGAmarelo.destroyEach();
  ciclistaPrincipal.addAnimation("SahilRunning",img1CiclistaPrincipal);
  distancia = 0;
}
