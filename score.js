/**
*	@file Code for drawing the player scores
*/

/**
*	This puts the required images to the screen
*	@param {Void}	: No parameters
*/
function scoreBoardImages(){
	//
	//	set the file array
	let fileArray = ['images/gomokuBlkC.png', 'images/gomokuWhtA.png'];

	//
	//	load the images
	let imgArray = loadImages(fileArray);
	
	Promise.all(imgArray).then(() => {
	//
	//load in the black piece
	toElem(imgArray[0], document.getElementById('img1'));
	
	//
	//load in the white piece
	toElem(imgArray[1], document.getElementById('img2'));
	
	});
}

//
//	global variable holding the player score
//	scores are arranged as [black_score, white_score]
let score = [0, 0];

/**
*	This increments the score based on color
*	@param {String} color	: Adds 1 to either array to update score
*	@post	This should only be called when either player wins
*/
function updateScore(color){
	console.log('updateScoreCalled');
	//
	//update the first score based on first color
	if(color == chesscolor[0]){
		score[0]++;
	}
	//
	//else update the other color
	else{
		score[1]++;
	}
	
	//
	//update the document element
	updateScoreBoard();
}

/**
*	This updates the document element to reflect score
*	@param {Void}	: No parameters
*	@post	This should be called when updateScore is updated
*/
function updateScoreBoard(){
	//
	//update the scoreBoard
	document.getElementById('sc1').innerText = score[0];
	document.getElementById('sc2').innerText = score[1];
}
