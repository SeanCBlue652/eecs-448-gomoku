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
	//if lock is engagedm then do not change state
	if(lock_aiSwitch){
		return;
	}
	//change state when switch is toggled
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

/*
*	Position Check
*	@author Peter Tso
*	@since 11/4/2020
*	@last_modified 11/4/2020
*/
/**
*	@param [a] Eq a takes the first element
*	@param [b] Eq b takes the second element
*	@pre Must have valid values of array a, b that are comparable
*	@post Returns the state of the array comparison
*	@return e Bool returns the state of the array
*/
function pos_check(a, b){
	return (a[0] == b[0]) ? ((a[1] == b[1]) ? true : false) : false;
}

/*
*	Simple AI Setup
*	@author Peter Tso
*	@since 11/4/2020
*	@last_modified 11/4/2020
*/
/**
*	@param Void
*	@pre must have game map setup
*	@post creates a movement 1D Array
*/
function simpleAiSetup(){
	pos_cache = new Array();
	for(let i = 0; i < map.length; i++){
		for(let k = 0; k < map[0].length; k++){
			pos_cache.push([k, i]);
		}
	}
}

/*
*	Simple Random AI
*	@author Peter Tso
*	@since 11/4/2020
*	@last_modified 11/8/2020
*/
/**
*	@param Boolean	for testing purporses
*	@pre must have simpleAiSetup() called beforehand
*	@post assigns the board with a random piece
*/
function simpleRandomAi(d){
	let arg0 = Math.floor(Math.random() * pos_cache.length);
	let u = pos_cache[arg0][0];
	let v = pos_cache[arg0][1];
	
	drawchess((30 * u) + 15, (30 * v) + 15, chesscolor[step % 2]);
	map[u][v] = chesscolor[step % 2];
	if(d){
		for(let i = 0; i < 4; i++){
			checkwin(u, v, chesscolor[step % 2], mode[i]);
		}
	}
	for(let i = 0; i < pos_cache.length; i++){
		if(pos_check([u, v], pos_cache[i])){
			pos_cache.splice(i, 1);
			break;
		}
	}
	step++;
	
}
