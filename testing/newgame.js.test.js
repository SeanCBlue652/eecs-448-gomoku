/**
*	@pre must have global variables loaded
*	@post runs the new game test
*/
function newgame_test(){
	//clear the board
	test_clear();
	
	//run the test
	zt_newgame_test();
}

/**
*	@pre must have cleared board
*	@post runs the test of clearing the board and checking global variables
*/
function zt_newgame_test(){
	//fill in the array with random pieces
	zt_test_simpleRandomAi(map.length * map.length, '', '', '', false);
	
	//call new game
	newgame();
	
	//test name
	let test = 'newgame_test: ';
	let state = true;
	
	//zero fill a array
	let mapc = new Array(map.length);
	for(let i = 0; i < mapc.length; i++){
		mapc[i] = new Array(mapc.length);
		for(let k = 0; k < mapc[i].length; k++){
			mapc[i][k] = 0;
		}
	}
	
	//check if new game is zero filled
	for(let i = 0; i < map.length; i++){
		for(let k = 0; k < map.length; k++){
			if(mapc[i][k] != map[i][k]){
				state = false;
			}
		}
	}
	//output message of zero fill
	if(state){
		console.log(test + 'zerofilled array: ' + s);
	}
	else{
		console.log(test + 'zerofilled array: ' + e);
	}
	//output message of flag
	if(flag == false){
		console.log(test + 'flag check: ' + s);
	}
	else{
		console.log(test + 'flag check: ' + e);
	}
	//output message of over
	if(over == false){
		console.log(test + 'over check: '  +s);
	}
	else{
		console.log(test + 'over check: ' + e);
	}
	//clear the game
	test_clear();
}
