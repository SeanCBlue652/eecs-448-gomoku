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
