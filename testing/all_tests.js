/**
*	@pre Must have window loaded
*	@post runs all tests, display to console
*/
function runAllTests(){
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
