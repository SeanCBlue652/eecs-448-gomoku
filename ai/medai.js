//simple weights for output
let i_weight = 100;
let k_weight = 75;
let q_weight = 1000;
let g_weight = 1100;

/**
*	@param bBoard Object that contains the map of the game
*	@pre Must have valid map object
*	@post Creates a array with assigned values
*	@return output Object returns a board that has assigned values
*/
function assignValue(bBoard){

	//generate a new board with 0 at each i, k position
	let output = new Array(bBoard.length);
	for(let i = 0; i < output.length; i++){
		output[i] = new Array(bBoard.length);
		for(let k = 0; k < output.length; k++){
			output[i][k] = 0;
		}
	}
	
	//assign values for the board
	for(let i = 0; i < output.length; i++){
		for(let k = 0; k < output.length; k++){
			//check the win states of the current board and assign higher weights
			for(let g = 3; g <= 4; g++){
				for(let q = 0; q < 4; q++){
					output[i][k] += gt_checkwin(i, k, 'white', mode[q], bBoard, q_weight, g);
					output[i][k] += gt_checkwin(i ,k ,'black', mode[q], bBoard, g_weight, g);
					
					//if the board element is occupied, set to empty value
					if(bBoard[i][k] == 'white' || bBoard[i][k] == 'black'){
						output[i][k] = 0;
					}
				}
			}
			//if the board element is white, assign all spaces surrounding with i_weight
			if(bBoard[i][k] == 'white'){
				for(let ux = i - 1; ux < i + 2; ux++){
					for(let vy = k - 1; vy < k + 2; vy++){
						zt_assign(bBoard, output, ux, vy, i_weight, i + 2, k + 2);
					}
				}
			}
			//if the board element is black, assign all spaces surrounding with k_weight
			else if(bBoard[i][k] == 'black'){
				for(let ux = i - 1; ux < i + 2; ux++){
					for(let vy = k - 1; vy < k + 2; vy++){
						zt_assign(bBoard, output, ux, vy, k_weight, i + 2, k + 2);
					}
				}
			}
		}
	}
	
	//return the output of the assign board values
	return output;
}

/**
*	@param bBoard Object map containing the current state of the game
*	@param dBoard Object map containing the assigned values of the game
*	@param u Integer X position of the board
*	@param v Integer Y position of the board
*	@param value Integer assign the value to the (u, v) position
*	@param boundu Integer boundary of u variable
*	@parma boundv Integer boundary of v variable
*	@pre must be called by assignValue, have dBoard.lenght === bBoard.length
*	@post assigns the value to (u, v) position
*/
function zt_assign(bBoard, dBoard, u, v, value, boundu, boundv){
	//do not access if the element is out of range of entire board
	if(u >= dBoard.length || v >= dBoard.length){
		return;
	}
	//check boundaries
	if(u >= 0 && u < boundu && v >= 0 && v < boundv){
		//check if the board is unoccupied
		if(bBoard[u][v] != 'white' && bBoard[u][v] != 'black'){
			//assign the current value + value at (u,v)
			dBoard[u][v] += value;
		}
	}
}

/**
*	@param bBoard Object map containing the assignValue
*	@pre Must have valid bBoard of Integers
*	@post compares to find the greatest position
*	@return maxP Object returns a 2 element array containing [x, y] position
*/
function maxPosition(bBoard){
	//maximum position
	let maxP = [0, 0]
	let maxV = 0;
	//loop through array
	for(let i = 0; i < bBoard.length; i++){
		for(let k = 0; k < bBoard.length; k++){
			//if the maxV value is less than ik position, assign to maxV
			if(maxV < bBoard[i][k] && bBoard[i][k] != 0){
				//assign Values and position
				maxV = bBoard[i][k];
				maxP = [i, k];
			}
		}
	}
	
	//return maximum position
	return maxP;
}

/**
*	@param bBoard Object map containing the assignValue
*	@pre Must have valid bBoard of Integers
*	@post compares to find least minimal position without placeholder
*	@return minP Object returns a 2 element array containing [x, y] position
*/
function minPosition(bBoard){
	//minimum position
	let minP = [0, 0]
	let minV = 1000000;
	//loop through array
	for(let i = 0; i < bBoard.length; i++){
		for(let k = 0; k < bBoard.length; k++){
			//if the minV value is greater than ik position, assign to minV
			if(minV > bBoard[i][k] && bBoard[i][k] != 0){
				//assign Values and position
				minV = bBoard[i][k];
				minP = [i, k];
			}
		}
	}
	
	//return minimum position
	return minP;
}

/**
*	@param x Integer X position
*	@param y Integer Y position
*	@param color String color of the piece to check
*	@param mode Object array selecting the mode to check for
*	@param dBoard Object map object containing the state of the game
*	@param value Integer value to assign
*	@pre Must have valid position and map object
*	@post copies and tests for winning position
*	@return value
*/
function gt_checkwin(x,y,color, mode, dBoard, value, rD){
	//copy the map
	let mapc = dBoard.map(x => x.map( y => y));
	
	//set the test piece on the copy
	mapc[x][y] = color;
	
	//counting the number of instances
	let count =0;
	
	let rV = 6 - (5 - rD);
	
	//check for pieces
	for(let i = 1;i < rV; i++){
        	if(mapc[x+i*mode[0]]){
            		if(mapc[x+i*mode[0]][y+i*mode[1]]==color){
                		count++;
            		}
            		else{
                		break;
            		}
        	}
        
	}
	for(let j = 1;j < rV; j++){
		if(mapc[x-j*mode[0]]){	        
			if(mapc[x-j*mode[0]][y-j*mode[1]]==color){
                		count++;
			}
			else{
                		break;
            		}
        	}
        
    	}
    	//if winning, return value
    	if(count>=rD){
		return value;
    	}
    	//else return 0
    	return 0;
}

/**
*	@pre Must have valid board
*	@post Interface for AI
*/
function simpleRudimentaryAi(){
	zt_medai(map, 2, true);
}

/**
*	@param matA Object 2D array of Integers
*	@param matB Object 2D array of Integers
*	@pre Must have non-undefined array of Integers
*	@post adds the two arrays together
*	@return output Object a 2D array of Integers
*/
function matrixAdd(matA, matB){
	//assign a new array of length of array A
	let output = new Array(matA.length);
	//loop through the entire matrix
	for(let i = 0; i < matA.length; i++){
		//assign a new array in each x position
		output[i] = new Array(matA.length);
		for(let k = 0; k < matA.length; k++){
			//output at ik equals the same position of matA and matB
			output[i][k] = matA[i][k] + matB[i][k];	
		}
	}
	//return the added matrix
	return output;
}

/**
*	@param length Integer length of the array
*	@pre None
*	@post creates a zero-filled 2d matrix
*	@return output Object returns a zero-filled matrix
*/
function zeroMatrix(length){
	//assign a new array of length
	let output = new Array(length);
	for(let i = 0; i < length; i++){
		output[i] = new Array(length);
		for(let k = 0; k < length; k++){
			//zero fill the array
			output[i][k] = 0;
		}
	}
	//return zero-filled array
	return output;
}

/**
*	@param bBoard Object the map containing the state of the game
*	@param turns Integer the number of turns to check for
*	@pre Must have valid bBoard Object and turns > 0
*	@post assigns the piece to the board
*/
function zt_medai(bBoard, turns, d){
	//debug
	console.log('zt_medai called');
	let max_turns = turns;
	//
	//copy the board
	let mapc = new Array(bBoard.length);
	for(let i = 0; i < bBoard.length; i++){
		mapc[i] = new Array(bBoard.length);
		for(let k = 0; k < bBoard.length; k++){
			//copy the board
			mapc[i][k] = bBoard[i][k];
		}
	}
	//assign the cumulative map to a zero matrix
	let cumulativeMap = zeroMatrix(bBoard.length);
	
	//assign vmap to values of copied map
	let vmap = assignValue(mapc);
	
	//iterate through max_turns
	for(let i = 0; i < max_turns; i++){
		//assign the coordinate of the maximum position
		let p = maxPosition(vmap);
		//assign to the copied map
		mapc[p[0]][p[1]] = 'white';
		//assign the new values
		vmap = assignValue(mapc);
		//assign the coordinate of the minimum position
		let g = minPosition(vmap);
		//assign to the copied map
		mapc[g[0]][g[1]] = 'black';
		//assign the new values
		vmap = assignValue(mapc);
		//at end of iteration exit loop and assign the board
		if(i == max_turns - 1){
			//check if the player is about to win
			let max_p = [0, 0];
			let max_v = 0;
			let o = assignValue(bBoard);
			for(let u = 0; u < bBoard.length; u++){
				for(let v = 0; v < bBoard.length; v++){
					if(max_v <= o[u][v]){
						max_p = [u, v];
						max_v = o[u][v];
					}
				}
			}
			//if player is about to win, then assign p as winning position
			if(max_v >= g_weight - k_weight){
				p = max_p;
			}
			
			//assign map
			map[p[0]][p[1]] = chesscolor[step % 2];
			
			//draw the chess color
			drawchess((p[0] * 30) + 15, (p[1] * 30) + 15, chesscolor[step % 2]);
			
			//check for wins
			if(d){
				for(let k = 0; k < 4; k++){
					checkwin(p[0], p[1], chesscolor[step % 2], mode[k]);
				}
			}
			step++;
			break;
		}
	}
	//console.table(cumulativeMap);
	//console.log(mapc);
	//console.table(map);
}
