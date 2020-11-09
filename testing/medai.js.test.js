/**
*	@pre must have valid board
*	@post runs the test for function zt_medai
*/
function medai_test(){
	let test = 'test_medai: ';
	
	//
	//run the code once
	zt_medai_test(1, test + 'run 1: ', s, e);
	test_clear();
	
	//
	//run the code until fill
	zt_medai_test(map.length * map.length, test + 'run fill: ', s, e);
	test_clear();
	
	//
	//run the code until overflow
	zt_medai_test((map.length * map.length) + 1, test + 'run overflow: ', s, e);
	test_clear();
	
	//
	//run the code until win
	let inc = 0;
	while(!flag){
		simpleRudimentaryAi();
		inc++;
		if(flag){
			console.log(test + 'check win: ' + s);
			break;
		}
		if(inc >= map.length * map.length){
			console.log(test + 'check win: ' + e);
			break;
		}
	}
	test_clear();
	
}

/**
*	@pre must have valid board
*	@post runs a modified version of simpleRudimentaryAi
*/
function zt_simpleRudimentaryAi(){
	zt_medai(map, 2, false);
}

/**
*	@param n Integer run the ai for N times
*	@param m1 String test name
*	@param m2 String message when success
*	@param m3 String message when error
*	@pre must have valid board
*	@post runs the zt_simpleRudimentaryAi() function n times
*/
function zt_medai_test(n, m1, m2, m3){
	//use the ai
	let state = true;
	try{
		//run the code n times
		for(let i = 0; i < n; i++){
			zt_simpleRudimentaryAi();
		}
	}
	catch(err){
		state = false;
	}
	
	//if error occured, log to user
	if(state){
		console.log(m1 + m2);
	}
	else{
		console.log(m1 + m3);
	}
}
