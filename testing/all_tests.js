/**
*	global variable
*/
let t = false;

//run the runAllTests function at button press
/*
*	Debug Button Event Listener
*	@author Peter Tso
*	@since 11/8/2020
*	@last_modified 11/8/2020
*	@Brief Adds debug button for testing
*/
document.getElementById('d_btn').addEventListener('click', () => {
	if(!t){
		t = true;
		runAllTests();
	}
	else{
		alert("Run tests has already been toggled\n");
	}
});

/*
*	Run All Tests
*	@author Peter Tso
*	@since 11/8/2020
*	@last_modified 11/8/2020
*	@Brief Run all current tests
*/
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
