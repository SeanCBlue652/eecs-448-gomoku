function test_checkwin(){
	let test = 'test_checkwin: ';
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

function pmt(x, y, color){
	map[x][y] = color;
}

function zt_test_checkwin(f, color, expected, m1, m2, m3){
	let state = true;
	f();
	for(let i = 0; i < map.length; i++){
		for(let k = 0; k < map.length; k++){
			for(let g = 0; g < 4; g++){
				checkwin(i, k, color, mode[g]);
			}
			if(flag){
				if(flag == expected){
					console.log(m1 + m2);
					return;
				}
			}
		}
	}
	if(flag == expected){
		console.log(m1 + m2);
	}
	else if(flag == expected){
		console.log(m1 + m2);
	}
	else{
		console.log(m1 +m3);
	}
}
