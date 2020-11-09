/*
*	AI Test
*	@author Peter Tso
*	@since 11/8/2020
*	@last_modified 11/8/2020
*	@Brief Executes test for AI testing
*/
/**
*	@pre must have valid maps
*	@post runs the test ai functions
*/
function ai_test(){
	//testing the position checking
	test_pos_check();
	
	//test the simpleRandomAi
	test_simpleRandomAi();
}

/*
*	Test Position Check
*	@author Peter Tso
*	@since 11/8/2020
*	@last_modified 11/8/2020
*	@Brief Tests all possible cominations of Position Check
*/
/**
*	@pre None
*	@post logs the cases
*/
function test_pos_check(){
	//all positions
	let test = 'test_pos_check: ';
	let empty = [];
	let elema1 = [1, ];
	let elema2 = [1, 2];
	let elemb1 = [1, ];
	let elemb2 = [2, 1];
	let elemc1 = [, 1];
	let elemc2 = [1, 3];
	
	//test several cases
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

/*
*	Test Clear
*	@author Peter Tso
*	@since 11/8/2020
*	@last_modified 11/8/2020
*	@Brief Clears the board and setup for new testing
*/
/**
*	@pre must have required files
*	@post clears the board and sets up for next test
*/
function test_clear(){
	//clear map
	newgame();
	
	//update setup
	simpleAiSetup();
}

/*
*	Test Simple Random AI
*	@author Peter Tso
*	@since 11/8/2020
*	@last_modified 11/8/2020
*	@Brief Tests the simple Random AI operation
*/
/**
*	@pre must have valid board
*	@post logs the cases tested
*/
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

/*
*	zt Test Simple Random AI
*	@author Peter Tso
*	@since 11/8/2020
*	@last_modified 11/8/2020
*	@Brief Unit tests of simple random ai
*/
/**
*	@param n Integer, run the code n times
*	@param ms1 String test name
*	@param ms2 String message when successful
*	@param ms3 String message when error occured
*	@param d boolean Turn on/off the checkwin of ai
*	@pre Must have valid/cleared board
*	@post logs the test
*/
function zt_test_simpleRandomAi(n, ms1, ms2, ms3, d){
	//use the ai
	let state = true;
	try{
		for(let i = 0; i < n; i++){
			simpleRandomAi(d);
		}
	}
	catch(err){
		state = false;
	}
	
	//if error occured, log to user
	if(state){
		console.log(ms1 + ms2);
	}
	else{
		console.log(ms1 + ms3);
	}
}

/*
*	zt Test Position Check
*	@author Peter Tso
*	@since 11/8/2020
*	@last_modified 11/8/2020
*	@Brief Unit tests of Test Position Check
*/
/**
*	@param a Object, array to compaer
*	@param b Object, array to compare
*	@param m1 String, test name
*	@param m2 String message when successful
*	@param m3 String message when error occured
*	@pre None
*	@post logs the test
*/
function zt_test_pos_check(a, b, expected, m1, m2, m3){
	//use the pos_check function
	let res = false;
	let state = true;
	try{
		res = pos_check(a, b);
	}
	catch(err){
		state = false;
	}
	//if error has occured, then state error
	if(state){
		//if result is different than expected, state error
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
