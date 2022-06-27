"use strict"

const container = document.getElementById('container');
const rowCount = 15;
const colCount = 10;

function drawBoard() {
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.i = i;
            cell.dataset.j = j;
            container.append(cell);
            if(i === 0 && j ===4) {
                cell.classList.add('active');
            }
        }
    }
}

drawBoard();

function moveDown() {
    const activeEl = document.getElementsByClassName('active')[0];
    activeEl.classList.remove('active');
    const nextEl = document.querySelectorAll(`div[data-i = "${+activeEl.dataset.i + 1}"]`)[activeEl.dataset.j];
    nextEl.classList.add('active');
    nextEl.id='active'; 
	 
	 if(activeEl.dataset.i === `${rowCount-2}`){
		nextEl.style.backgroundColor = 'red';
		
	 }
	
}
function moveLeft() {
	const activeEl = document.getElementsByClassName('active')[0];
	activeEl.classList.remove('active');
	const nextEl = document.querySelectorAll(`div[data-j = "${+activeEl.dataset.j - 1}"]`)[activeEl.dataset.i];
	nextEl.classList.add('active');

	if(activeEl.dataset.j === 1){
		nextEl.style.backgroundColor = 'red';
		
	 }
	
}
function moveRight() {
	const activeEl = document.getElementsByClassName('active')[0];
	activeEl.classList.remove('active');
	const nextEl = document.querySelectorAll(`div[data-j = "${+activeEl.dataset.j + 1}"]`)[activeEl.dataset.i];
	nextEl.classList.add('active');

	if(activeEl.dataset.j === 1){
		nextEl.style.backgroundColor = 'red';
		
	 }
	
}

window.addEventListener('keydown', (e) => {
	const activeEl = document.getElementsByClassName('active')[0];
    if (e.key === 'ArrowDown' && activeEl.dataset.i < colCount+4) {
		
        moveDown();
    }
	 if (e.key === 'ArrowLeft' && activeEl.dataset.j > 0) {
		moveLeft();
  }
  if (e.key === 'ArrowRight' && activeEl.dataset.j <`${colCount-1}`) {
	moveRight();
}
});
