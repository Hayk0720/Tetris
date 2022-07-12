let playGround = document.querySelector(".game-container");
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
let gameSpeed=400;

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
let activEl = {
	x:0,
	y:0,
	shape:[
		[1,1,1],//[0,0,1],
		[0,1,0],//[0,1,1],
		[0,0,0],//[0,0,1],
	],
}

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
		}
		removeLine = true;
	}
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





	

	document.onkeydown = function(e){
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
			activEl.y +=1;
			if(outfield()){
				activEl.y -= 1;
				fixElem();
				removeFullLines();
				activEl.y = 0;
			}

		}
		else if(e.key ==="ArrowUp"){
			rotateEl();

		}

		updateEl();
		draw();
	}
	updateEl();

	draw();

	// function startGame(){
	// 	activEl.y +=1;
	// 	draw();
	// 	 setTimeout(startGame,gameSpeed)
	// }
	
	// setTimeout(startGame,gameSpeed);
	
	
