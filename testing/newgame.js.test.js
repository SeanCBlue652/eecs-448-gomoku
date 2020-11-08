function newgame_test(){
	test_clear();
	zt_newgame_test();
}

function zt_newgame_test(){
	//fill in the array with random pieces
	zt_test_simpleRandomAi(map.length * map.length, '', '', '', false);
	newgame();
	let test = 'newgame_test: ';
	let state = true;
	let mapc = new Array(map.length);
	for(let i = 0; i < mapc.length; i++){
		mapc[i] = new Array(mapc.length);
		for(let k = 0; k < mapc[i].length; k++){
			mapc[i][k] = 0;
		}
	}
	for(let i = 0; i < map.length; i++){
		for(let k = 0; k < map.length; k++){
			if(mapc[i][k] != map[i][k]){
				state = false;
			}
		}
	}
	if(state){
		console.log(test + 'zerofilled array: ' + s);
	}
	else{
		console.log(test + 'zerofilled array: ' + e);
	}
	
	if(flag == false){
		console.log(test + 'flag check: ' + s);
	}
	else{
		console.log(test + 'flag check: ' + e);
	}
	
	if(over == false){
		console.log(test + 'over check: '  +s);
	}
	else{
		console.log(test + 'over check: ' + e);
	}
	test_clear();
}
