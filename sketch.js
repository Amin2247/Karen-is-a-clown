let xVal;
let yVal;
let msNew0;
let msOld = 0;
let canvasWidth = 400;
let canvasHeight = 500;
let clickX = 50;
let clickY = 50;
let colorVal = "black";
let msStart = 0;
let current = 0;
let newdiameter = 0;

let gameOver = 0;
let hitCount = 0;
let totalCount = 0;
let gameState = "gameStart";
let clicked = false;
let cnv;
let delayTime = 0;
let gameTime = 15000; // msec 
let diameter = 50;
let speed = 800; // drawing cycle
let hitSound;

function preload() {
  hitSound = loadSound('assets/game.mp3');
}
function setup() {

  cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.mousePressed(hitColor);
  cnv.mouseReleased(normalColor);
  xVal = canvasWidth / 2;
  yVal = canvasHeight / 2;
  frameRate(60);
}


function mousePressed() {
  clickX = winMouseX - 50;
  clickY = winMouseY - 50; 
  clicked = true;
  //push();
  //fill("white")
  //textSize(12);
  //text(clickX+ " " + clickY, clickX, clickY);
  //pop();
  //console.log("mousePressed(): ",clickX, clickY);
}
function mouseRelease() {
 
}
function normalColor() {
  colorVal = "black";
}
function hitColor() {
  colorVal = "red";
}

function hitMade() {
  let d = sqrt((xVal - clickX) ** 2 + (yVal - clickY) ** 2);

  if (d <= diameter/2) {
    console.log("clickX, Y: ", clickX, clickY, " xVal, yVal: ", xVal, yVal);
    //console.log("d & diameter: " + d + " " + diameter/2);
    return 1;
  } 
      //console.log("Click X, Y: ", clickX, clickY, " Val X, Y: ", xVal, yVal);
    //console.log("d & diameter: " + d + " " + diameter);
    return 0;
}


function keyReleased() {
  if (gameState === "gameStart" || gameState === "gameEnd") {
    key = key.toUpperCase();
    switch (key) {
      case 'S':
        console.log("gameStart");
        gameState = "gameStart";
        break;
      case "1":
        console.log("level1");
        gameState = "lvl1";
        break;
      case "2":
        gameState = "lvl2";
        break;
      case "3":
        gameState = "lvl3";
        break;
      case "E":
        gameState = "gameEnd";
        break;
    }
  }
}

// Function for rendering the gameStart screen.
function gameStart() {  
  background(100, 100, 240);  
  stroke(200);
  fill(255);
  textSize(50);
  textAlign(CENTER);
  text("Game Begin", width * 0.5, height * 0.3);
  textSize(25);
  text("Game has three levels:", width * 0.5, height * 0.46);
  stroke(150);
  textSize(16);

  text('You will see bubbles appear in random places', width * 0.5, height * 0.56);
  text('click the mouse inside the bubble to pop it', width * 0.5, height * 0.60);
  text('Press "1" for Easy', width * 0.5, height * 0.76);
  text('Press "2" for Medium', width * 0.5, height * 0.80);
  text('Press "3" for Hard', width * 0.5, height * 0.84);
  clicked = false;
  fadeDuration = 0;
  msStart = millis();
  gameOver = millis() + gameTime;
  clickX = 0;
  clickY = 0;
  totalCount =0;
  hitCount = 0;
}

// Function for rendering the main game play screen.
function gameStage1() {
  diameter = 70;
  speed = 1000; // drawing cycle
  background(100, 240, 100);
  stroke(0);
  textSize(25);
  textAlign(CENTER);
  push();
  fill(255);  
  stroke(255);
  text("Level 1", width * 0.5, height * 0.9);
  pop();
  play();
}
function gameStage2() {
  diameter = 55;
  speed = 1000; // drawing cycle
  background(240, 100, 100);
  stroke(0);
  fill(0);
  textSize(30);
  textAlign(CENTER);
  push();
  fill(255);  
  stroke(255);
  text("Level 2", width * 0.5, height * 0.9);
  pop();
  play();
}
function gameStage3() {
  diameter = 45;
  speed = 1000; // drawing cycle
  //background(100, 100, 240);
  background(204, 204, 0); 
  stroke(0);
  fill(0);
  textSize(30);
  textAlign(CENTER);
  push();
  fill(255);  
  stroke(255);
  text("Level 3", width * 0.5, height * 0.9);
  pop();
  play();
}
// Function for rendering game over screen.
function gameEnd() {
  background(240, 0, 0);
  stroke(255);
  fill(255);
  textSize(40);
  textAlign(CENTER);
  text("GAME OVER", width * 0.5, height * 0.33);
  textSize(16);
  text('Total bubbles: ' + totalCount, width * 0.5, height * 0.56);
  text('Number of pops: '+ hitCount, width * 0.5, height * 0.61);
  text('Percentage: %' + parseInt((hitCount/totalCount)*100), width * 0.5, height * 0.66);
  textSize(20);
  text('Press "S" to restart the game', width * 0.5, height * 0.76);

}
function play() {
  if(millis() < delayTime ){
    return;
  }
  if(millis() > gameOver){
    gameState = "gameEnd";
    return;
  }
  //console.log("timeRemaining: ", (gameOver - millis())/1000);
  //background(220);
  current = millis();
  if (current < msStart + fadeDuration) {
    fill("red");
    if (newdiameter > 0) {
      newdiameter = newdiameter - 4;
    }
    else {
      delayTime = millis() +1000;  // wait 1 sec after a hit
    }
    circle(xVal, yVal, newdiameter);

  } else {
    msNew = millis(); //getMsecond();
    if (msNew > msOld + speed) {
      clickX = 0;
      clickY = 0;
      xVal = parseInt(random(diameter+50, canvasWidth - diameter));
      yVal = parseInt(random(diameter+50, canvasHeight - diameter -100));
      //console.log("Play, xVal, yVal: ", xVal, yVal);   
      //console.log("Play, clickX, clickY: ", clickX, clickY);  
      msOld = msNew;
      totalCount++;
   
    }
    //console.log("xVal, yVal: ", xVal, yVal);  
    circle(xVal, yVal, diameter);
  
    //push();
    //fill("white")
    //textSize(12);
    //text(xVal+ " " + yVal, xVal, yVal);
    //pop();
    if (hitMade() && clicked == true) {
      hitSound.play();
      console.log("xVal, yVal: ", xVal, yVal);
      clickX = 0;
      clickY = 0;
      fill("red");
      msStart = millis();
      fadeDuration = 200;
      newdiameter = diameter;
      hitCount++;
      clicked = false;
    } 
    else {
      fill("black");

    }

  }
}
//==================================

/* The draw loop content is drawn depending on the current value of 
gameState. The 'switch' function here is replacing what could be an 
'if-else' statement. */
function draw() {
  switch (gameState) {
    case "gameStart":
      //console.log("gameStart");
      gameStart();
      break;
    case "lvl1":
      //console.log("level 1");
      gameStage1();
      break;
    case "lvl2":
      //console.log("level 2");
      gameStage2();
      break;
    case "lvl3":
      //console.log("level 3");
      gameStage3();
      break;
    case "gameEnd":
      //console.log("gameEnd");
      gameEnd();
      break;
  }
}