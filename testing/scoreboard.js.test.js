function score_test(){
	test_updateScore();
}

function test_updateScore(){
	let test = 'test_updateScore: ';
	//
	//increment up once
	zt_test_updateScore(1, 'black', test + 'black +1: ', s, e);
	zt_test_updateScore(1, 'white', test + 'white +1: ', s, e);
	zt_test_updateScore(1, 'yellow', test + 'yellow +1: ', s, e);
	zt_test_updateScore(50, 'black', test + 'black + 50: ', s, e);
	zt_test_updateScore(50, 'white', test + 'white + 50: ', s, e);
	zt_test_updateScore(50, 'yellow', test + 'yellow + 50: ', s, e);
}

function zt_test_updateScore(n, color, m1, m2, m3){
	score = [0, 0];
	for(let i = 0; i < n; i++){
		updateScore(color);
	}
	if(color == 'black'){
		if(score[0] == n){
			console.log(m1 + m2);
		}
		else{
			console.log(m1 + m3);
		}
	}
	else if(color == 'white'){
		if(score[1] == n){
			console.log(m1 + m2);
		}
		else{
			console.log(m1 + m3);
		}
	}
	else{
		console.log(m1 + m3);
	}
	
}	
