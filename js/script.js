




let playGround = document.querySelector(".game-container");
const scoreElem = document.getElementById('score');
const levelElem = document.getElementById('level');
const nextElem = document.getElementById('nextEl');
const startbtn = document.getElementById('start')
const pausebtn = document.getElementById('pause')
//let playField =Array(20).fill(Array(10).fill(0))

let playField =[
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
];
let figures = {
	O: [
	  [1, 1],
	  [1, 1],
	],
	I: [
	  [0, 0, 0, 0],
	  [1, 1, 1, 1],
	  [0, 0, 0, 0],
	  [0, 0, 0, 0],
	],
	S: [
	  [0, 1, 1],
	  [1, 1, 0],
	  [0, 0, 0],
	],
	Z: [
	  [1, 1, 0],
	  [0, 1, 1],
	  [0, 0, 0],
	],
	L: [
	  [1, 0, 0],
	  [1, 1, 1],
	  [0, 0, 0],
	],
	J: [
	  [0, 0, 1],
	  [1, 1, 1],
	  [0, 0, 0],
	],
	T: [
	  [1, 1, 1], 
	  [0, 1, 0], 
	  [0, 0, 0], 
	],
 };
let score  = 0;
let currentLevel = 1;
let gameTimerId;
let isPaused = false;
let possibleLevels = {
	1:{
		scorePerLine:10,
		speed: 400,
		nextLeveScore:20,
	},
	2:{
		scorePerLine:15,
		speed: 300,
		nextLeveScore:500,
	},
	3:{
		scorePerLine:20,
		speed: 200,
		nextLeveScore:1000,
	},
	4:{
		scorePerLine:30,
		speed: 100,
		nextLeveScore:Infinity,
	},
}

function removePrevEl(){
	for (let i = 0; i < playField.length; i++) {
		for (let j = 0; j < playField[i].length; j++) {
			if(playField[i][j] ===1){
				
				playField[i][j] = 0;
			}
		}
	}
}

function updateEl(){
	removePrevEl();
	for (let y = 0; y < activEl.shape.length; y++) {
for (let x = 0; x < activEl.shape[y].length; x++) {
	if(activEl.shape[y][x]) {
		playField[activEl.y+y][activEl.x+x]  = activEl.shape[y][x];
	}
	
}		
	}
}

function rotateEl(){
	const prevElState = activEl.shape;
activEl.shape = activEl.shape[0].map((val,index) => 
activEl.shape.map((row)=>row[index]).reverse()
);
if(outfield()){
activEl.shape = prevElState;
}
}

let activEl = getNewEl();
let nextEl = getNewEl();



function draw(){
	let groundInnerHTML = '';
	for (let i = 0; i < playField.length; i++) {
		for (let j = 0; j < playField[i].length; j++) {
			
			if(playField[i][j]===1){
				groundInnerHTML += '<div class = "cell movingCell"></div>'
			}else if(playField[i][j]===2){
				groundInnerHTML += '<div class = "cell fixedCell"></div>'
			}else {
			groundInnerHTML += '<div class = "cell"></div>';
			}
		
		}	
			
	}
	playGround.innerHTML = groundInnerHTML;
	
}
function drawNextEl() {
	let nextElInnerHTML = "";
	for (let y = 0; y < nextEl.shape.length; y++) {
	  for (let x = 0; x < nextEl.shape[y].length; x++) {
		 if (nextEl.shape[y][x]) {
			nextElInnerHTML += '<div class="cell movingCell"></div>';
		 } else {
			nextElInnerHTML += '<div class="cell"></div>';
		 }
	  }
	  nextElInnerHTML += "<br/>";
	}
	nextElem.innerHTML = nextElInnerHTML;
 }


function outfield(){
	for (let y = 0; y < activEl.shape.length; y++) {
		for (let x = 0; x < activEl.shape[y].length; x++) {
			if(
					activEl.shape[y][x] && 
						(
						playField[activEl.y+y] === undefined || 
						playField[activEl.y+y][activEl.x+x] === undefined ||
						playField[activEl.y+y][activEl.x+x] ===2
						)
			  ) 
			  {
				return true;
			}			
		}		
	} 
	return false;
}



function removeFullLines(){
	let removeLine = true;
	filledLines = 0;
	for (let i = 0; i < playField.length; i++) {
		for (let j = 0; j < playField[i].length; j++) {
			if(playField[i][j] !== 2){
				removeLine = false;
				break;
			}
		}
		if(removeLine){
			playField.splice(i,1);
			playField.splice(0,0,[0,0,0,0,0,0,0,0,0,0]);
			filledLines +=1;
		}
		removeLine = true;
	}
	switch (filledLines) {
		case 1:
			score += possibleLevels[currentLevel].scorePerLine;
			
			break;
		case 2:
			score += possibleLevels[currentLevel].scorePerLine * 3;
			
			break;
		case 3:
			score += possibleLevels[currentLevel].scorePerLine * 6;
			
			break;
		case 4:
			score += possibleLevels[currentLevel].scorePerLine * 12;
			
			break;
			
	}
	scoreElem.innerHTML = score;

	if(score >= possibleLevels[currentLevel].nextLeveScore){
		currentLevel++;
		levelElem.innerHTML = currentLevel;
	}
}

function getNewEl(){
const possibleFigures = "IOLJTSZ";
const rand = Math.floor(Math.random() * 7);
const newEl = figures[possibleFigures[rand]];

return {
  x: Math.floor((10 - newEl[0].length) / 2),
  y: 0,
	shape: newEl,
};
}

function fixElem(){
	for (let i = 0; i < playField.length; i++) {
		for (let j = 0; j < playField[i].length; j++) {
			if(playField[i][j]===1){
				playField[i][j]=2;
			}
		}		
	}
}

function moveElDown(){
	
		activEl.y +=1;
		if(outfield()){
			activEl.y -= 1;
			fixElem();
			removeFullLines()
			activEl = nextEl;
			if(outfield()){
				reset();
				
			}
			nextEl = getNewEl();
		}

	
	
}
function dropEl(){
for (let i = activEl.y; i < playField.length; i++) {
	activEl.y +=1;
	if(outfield()){
		activEl.y -=1;
		return;
	}
	
}				
}
function reset(){
	
	clearTimeout(gameTimerId);
	isPaused = true;
	playField =[
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
	];

}
document.onkeydown = function(e){
	if(!isPaused){
		if(e.key === "ArrowLeft"){
			activEl.x -= 1;
			if(outfield()){
				activEl.x +=1
			}
			
		}
		else if(e.key ==="ArrowRight"){
			activEl.x +=1
			if(outfield()){
				activEl.x -=1
			}

		}
		else if(e.key ==="ArrowDown"){
			moveElDown()

		}
		else if(e.key ==="ArrowUp"){
			rotateEl();

		}else if(e.code === "Space"){
			dropEl();
		}

		updateEl();
		draw();
		drawNextEl();
	}
	};
	pausebtn.addEventListener('click',(e)=>{
		
		if(e.target.innerHTML === 'PAUSE'){
			e.target.innerHTML = 'CONTINUE'
			clearTimeout(gameTimerId);
		}else {
			e.target.innerHTML = 'PAUSE';
			getElementById = setTimeout(startGame,possibleLevels[currentLevel].speed);
		}
		isPaused = !isPaused;
	})
	startbtn.addEventListener('click',(e)=>{
		isPaused = false;
		getElementById = setTimeout(startGame,possibleLevels[currentLevel].speed);
	})

	scoreElem.innerHTML = score;
	levelElem.innerHTML = currentLevel;

	// updateEl();
	 draw();
	// drawNextEl();

	function startGame(){
		
			moveElDown();
			updateEl();
			draw();
			drawNextEl();
	
		
		gameTimerId = setTimeout(startGame,possibleLevels[currentLevel].speed);
	}
	
	//setTimeout(startGame,possibleLevels[currentLevel].speed);
	
	
