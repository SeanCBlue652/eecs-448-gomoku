
/**
*	@pre Must have valid board
*	@post test the checkwin function
*/
function test_checkwin(){
	//test name
	let test = 'test_checkwin: ';
	
	//clear the board
	test_clear();
	
	//
	//test when there is one piece
	zt_test_checkwin(
		() => { pmt(0, 0, 'black') },
		'black',
		false,
		test + 'test +1 black: ',
		s,
		e
	);
	test_clear();
	zt_test_checkwin(
		() => { pmt(0, 0, 'white') },
		'white',
		false,
		test + 'test +1 white: ',
		s,
		e
	);
	test_clear();
	//
	//test the win states horizontal
	zt_test_checkwin(
		() => {
			for(let i = 0; i < 5; i++){
				pmt(i, 0, 'black');
			}
		},
		'black',
		true,
		test + 'test +5 horizontal: ',
		s,
		e
	);
	test_clear();
	
	//
	//test the win states vertical
	zt_test_checkwin(
		() => {
			for(let i = 0; i < 5; i++){
				pmt(0, i, 'black');
			}
		},
		'black',
		true, 
		test + 'test +5 vertical: ',
		s,
		e
	);
	test_clear();
	
	//
	//test the win states diagonal left
	zt_test_checkwin(
		() => {
			for(let i = 0; i < 5; i++){
				pmt(i, i, 'black');
			}
		},
		'black',
		true,
		test + 'test +5 diagonalL: ',
		s,
		e
	);
	test_clear();
	
	//
	//test the win states diagonal right
	zt_test_checkwin(
		() => {
			for(let i = 4; i >= 0; i--){
				pmt(4 - i, i, 'black');
			}
		},
		'black',
		true,
		test + 'test +5 diagonalR: ',
		s,
		e
	);
	test_clear();
}

/**
*	@param x Integer X position
*	@param y Integer Y position
*	@param color String color
*	@pre must have valid coordinates
*	@post assigns a color ot (x,y) of map
*/
function pmt(x, y, color){
	map[x][y] = color;
}

/**
*	@param f Function function that executes before test
*	@param color String color
*	@param expected Boolean expected result from checkwin
*	@param m1 String test name
*	@param m2 String message when successful
*	@param m3 String message when error
*	@pre must have valid function, color, and map
*	@post test the function and logs the test
*/
function zt_test_checkwin(f, color, expected, m1, m2, m3){
	let state = true;
	//execute the function
	f();
	//check all position of map
	for(let i = 0; i < map.length; i++){
		for(let k = 0; k < map.length; k++){
			for(let g = 0; g < 4; g++){
				checkwin(i, k, color, mode[g]);
			}
			//if win detected,
			if(flag){
				//if the win is expected, log success message
				if(flag == expected){
					console.log(m1 + m2);
					return;
				}
			}
		}
	}
	//if win not detected and expected is false
	if(flag == expected){
		console.log(m1 + m2);
	}
	else{
	//if the win is not detected and expected is true
		console.log(m1 +m3);
	}
}
