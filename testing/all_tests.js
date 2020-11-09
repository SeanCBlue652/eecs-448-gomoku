/**
*	global variable
*/
let t = false;

//run the runAllTests function at button press
document.getElementById('d_btn').addEventListener('click', () => {
	if(!t){
		t = true;
		runAllTests();
	}
	else{
		alert("Run tests has already been toggled\n");
	}
});


/**
*	@pre Must have window loaded
*	@post runs all tests, display to console
*/
function runAllTests(){
	//clear the board
	test_clear();
	
	//runs the resource testing
	resource_test();
	
	//runs the simple ai testing
	ai_test();
	
	//run the score board testing
	score_test();
	
	//run the checkwin testing
	test_checkwin();
	
	//run the new game testing
	newgame_test();
	
	//test rudimentary ai
	medai_test();
}
