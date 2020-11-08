function ai_test(){
	//testing the position checking
	test_pos_check();
	test_simpleRandomAi();
}

function test_pos_check(){
	let test = 'test_pos_check: ';
	let empty = [];
	let elema1 = [1, ];
	let elema2 = [1, 2];
	let elemb1 = [1, ];
	let elemb2 = [2, 1];
	let elemc1 = [, 1];
	let elemc2 = [1, 3];
	
	zt_test_pos_check(empty, empty, true, test + 'empty: ', s, e);
	zt_test_pos_check(empty, elema1, false, test + 'empty + elema1: ', s, e);
	zt_test_pos_check(empty, elema2, false, test + 'empty + elema2: ', s, e);
	zt_test_pos_check(empty, elemb2, false, test + 'empty + elemb2: ', s, e);
	zt_test_pos_check(empty, elemc1, false, test + 'empty + elemc1: ', s, e);
	zt_test_pos_check(elema1, elema2, false, test + 'elema1 + elema2: ', s, e);
	zt_test_pos_check(elema2, elema2, true, test + 'elema2 + e;ema2: ', s, e);
	zt_test_pos_check(elema1, elema1, true, test + 'elema1 + elema1: ', s, e);
	zt_test_pos_check(elema2, elemc2, false, test + 'elema2 + elemc2: ', s, e);
	
	
}

function test_clear(){
	newgame();
	simpleAiSetup();
}

function test_simpleRandomAi(){
	let test = 'test_simpleRandomAi: ';
	
	//
	//run the code once
	zt_test_simpleRandomAi(1, test + 'run 1: ', s, e, false);
	test_clear();
	
	//
	//run the code until board is filled
	zt_test_simpleRandomAi(map.length * map.length, test + 'run fill: ', s, e, false);
	test_clear();
	
	//
	//run the code overflow the board
	zt_test_simpleRandomAi((map.length * map.length) + 1, test + 'run overflow: ', s, e, false);
	test_clear();
	
	//
	//run until win game
	while(!flag){
		simpleRandomAi(true);
		if(flag){
			console.log(test + 'check win: ' + s);
			break;
		}
		if(pos_cache == []){
			console.log(test + 'check win: ' + e);
			break;
		}
	}
	test_clear();
}

function zt_test_simpleRandomAi(n, ms1, ms2, ms3, d){
	let state = true;
	try{
		for(let i = 0; i < n; i++){
			simpleRandomAi(d);
		}
	}
	catch(err){
		state = false;
	}
	if(state){
		console.log(ms1 + ms2);
	}
	else{
		console.log(ms1 + ms3);
	}
}

function zt_test_pos_check(a, b, expected, m1, m2, m3){
	let res = false;
	let state = true;
	try{
		res = pos_check(a, b);
	}
	catch(err){
		state = false;
	}
	if(state){
		if(res == expected){
			console.log(m1 + m2);
		}
		else{
			console.log(m1 + m3);
		}
		return;
	}
	console.log(m1 + m3);
}
