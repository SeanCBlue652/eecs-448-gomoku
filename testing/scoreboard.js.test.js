/*
*	Score Tests
*	@author Peter Tso
*	@since 11/8/2020
*	@last_modified 11/8/2020
*	@Brief Test the Update Score function
*/
/**
*	@pre Must have valid document elements
*	@post runs the test_updateScore function
*/
function score_test(){
	test_updateScore();
}

/*
*	Test Update Score
*	@author Peter Tso
*	@since 11/8/2020
*	@last_modified 11/8/2020
*	@Brief Runs all Unit testing of zt.
*/
/**
*	@pre must be called by score_test();
*	@post runs all zt_tests
*/
function test_updateScore(){
	let test = 'test_updateScore: ';
	//
	//increment up once
	zt_test_updateScore(1, 'black', test + 'black +1: ', s, e);
	
	//
	//test for white
	zt_test_updateScore(1, 'white', test + 'white +1: ', s, e);
	
	//
	//test for when color is invalid
	zt_test_updateScore(1, 'yellow', test + 'yellow +1: ', s, e);
	
	//
	//test fifty times and check value
	zt_test_updateScore(50, 'black', test + 'black + 50: ', s, e);
	
	//
	//test fifty times and check value
	zt_test_updateScore(50, 'white', test + 'white + 50: ', s, e);
	
	//
	//test fifty times and check value
	zt_test_updateScore(50, 'yellow', test + 'yellow + 50: ', s, e);
}

/*
*	zt Test Update Score
*	@author Peter Tso
*	@since 11/8/2020
*	@last_modified 11/8/2020
*	@Brief Unit testing of possible comparing values
*/
/**
*	@param n Integer run the code n times
*	@param color String color
*	@param m1 String test name
*	@param m2 String message when success
*	@param m3 String message when error
*/
function zt_test_updateScore(n, color, m1, m2, m3){
	//reset the score
	score = [0, 0];
	//update the score n times
	for(let i = 0; i < n; i++){
		updateScore(color);
	}
	//if the color is black check 0
	if(color == 'black'){
		if(score[0] == n){
			console.log(m1 + m2);
		}
		else{
			console.log(m1 + m3);
		}
	}
	//if the color is white check 1
	else if(color == 'white'){
		if(score[1] == n){
			console.log(m1 + m2);
		}
		else{
			console.log(m1 + m3);
		}
	}
	//throw error
	else{
		console.log(m1 + m3);
	}
	
}	
