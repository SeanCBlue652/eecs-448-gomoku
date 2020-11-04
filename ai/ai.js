/*
*	GLOBAL VARIABLES
*/

//boolean for switching between normal play and computer
let aiSwitch = false;

let lock_aiSwitch = false;

//button for switching modes
let doc_aiSwitch = document.getElementById('ai_switch');

//canvas board object
let doc_board = document.getElementById('board');

//cache for maps
let map_cache = new Array();

let pos_cache = new Array();

//assign a event listener for ai
doc_aiSwitch.addEventListener('click', () => {
	if(lock_aiSwitch){
		return;
	}
	if(aiSwitch){
		doc_aiSwitch.innerText = 'AI OFF';	
	}
	else{
		doc_aiSwitch.innerText = 'AI ON';
	}
	aiSwitch = !aiSwitch;
});

/**
*	MAIN CODE
*/
function assign(vBoard){
	//assign as a string
	let ydim = vBoard.length;
	let xdim = vBoard[0].length;
	let output = new Array(ydim);
	for(let i = 0; i < ydim; i++){
		output[i] = 0b000000000000000;
		for(let k = 0; k < xdim; k++){
			let mask = (0b100000000000000 >> k);
			if(vBoard[i][k] != 0){
				output[i] |= mask;
			}
		}
	}
	
	return output;
}

function calculatePosition(vBoard, c, xdim, ydim){
	if(c >= map_cache){
		let max = 0;
		let pos = [0, 0];
		for(let i = 0; i < ydim; i++){
			for(let k = 0; k < xdim; k++){
				max = (max <= vBoard[i][k]) ? vBoard[i][k] : max;
				pos = (max <= vBoard[i][k]) ? [i, k] : pos;
			}
		}
		return pos;
	}
	c++;
	return calculatePosition(vBoard, c, xdim, ydim);
	
}

function output(vBoard, ydim){
	for(let i = 0; i < ydim; i++){
		console.log(i + ": " + vBoard[i].toString(2));
	}
}

function pos_check(a, b){
	return (a[0] == b[0]) ? ((a[1] == b[1]) ? true : false) : false;
}

function simpleAiSetup(){
	pos_cache = new Array();
	for(let i = 0; i < map.length; i++){
		for(let k = 0; k < map[0].length; k++){
			pos_cache.push([k, i]);
		}
	}
}

function simpleRandomAi(){
	let arg0 = Math.floor(Math.random() * pos_cache.length);
	let u = pos_cache[arg0][0];
	let v = pos_cache[arg0][1];
	
	drawchess((30 * u) + 15, (30 * v) + 15, chesscolor[step % 2]);
	map[u][v] = chesscolor[step % 2];
	for(let i = 0; i < 4; i++){
		checkwin(u, v, chesscolor[step % 2], mode[i]);
	}
	for(let i = 0; i < pos_cache.length; i++){
		if(pos_check([u, v], pos_cache[i])){
			pos_cache.splice(i, 1);
			break;
		}
	}
	step++;
	
}

//ai function
function runAi(rBoard){
	//change the board into values
	let ydim = rBoard.length;
	let xdim = rBoard[0].length;
	vBoard = assign(rBoard);

	
	output(vBoard, ydim);
}
