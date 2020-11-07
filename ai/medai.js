let i_weight = 100;
let k_weight = 75;
let q_weight = 500;
let g_weight = 5000;

function assignValue(bBoard){
	//assign 100 points to places that benefit ai
	//assign 75 points to places that hurt ai

	let output = new Array(bBoard.length);
	for(let i = 0; i < output.length; i++){
		output[i] = new Array(bBoard.length);
		for(let k = 0; k < output.length; k++){
			output[i][k] = 0;
		}
	}
	
	for(let i = 0; i < output.length; i++){
		for(let k = 0; k < output.length; k++){
			for(let q = 0; q < 4; q++){
				output[i][k] += gt_checkwin(i, k, 'white', mode[q], bBoard, q_weight);
				output[i][k] += gt_checkwin(i ,k ,'black', mode[q], bBoard, g_weight);
				if(bBoard[i][k] == 'white' || bBoard[i][k] == 'black'){
					output[i][k] = 0;
				}
			}
			if(bBoard[i][k] == 'white'){
				for(let ux = i - 1; ux < i + 2; ux++){
					for(let vy = k - 1; vy < k + 2; vy++){
						zt_assign(bBoard, output, ux, vy, i_weight, i + 2, k + 2);
					}
				}
			}
			else if(bBoard[i][k] == 'black'){
				for(let ux = i - 1; ux < i + 2; ux++){
					for(let vy = k - 1; vy < k + 2; vy++){
						zt_assign(bBoard, output, ux, vy, k_weight, i + 2, k + 2);
					}
				}
			}
		}
	}
	
	return output;
}

function zt_assign(bBoard, dBoard, u, v, value, boundu, boundv){
	if(u >= dBoard.length || v >= dBoard.length){
		return;
	}
	if(u >= 0 && u < boundu && v >= 0 && v < boundv){
		if(bBoard[u][v] != 'white' && bBoard[u][v] != 'black'){
			dBoard[u][v] += value;
		}
	}
}

function maxPosition(bBoard){
	let maxP = [0, 0]
	let maxV = 0;
	for(let i = 0; i < bBoard.length; i++){
		for(let k = 0; k < bBoard.length; k++){
			if(maxV < bBoard[i][k] && bBoard[i][k] != 0){
				maxV = bBoard[i][k];
				maxP = [i, k];
			}
		}
	}
	
	return maxP;
}

function minPosition(bBoard){
	let minP = [0, 0]
	let minV = 1000000;
	for(let i = 0; i < bBoard.length; i++){
		for(let k = 0; k < bBoard.length; k++){
			if(minV > bBoard[i][k] && bBoard[i][k] != 0){
				minV = bBoard[i][k];
				minP = [i, k];
			}
		}
	}
	
	return minP;
}

function gt_checkwin(x,y,color, mode, dBoard, value){
	let mapc = dBoard.map(x => x.map( y => y));
	mapc[x][y] = color;
	let count =0;
	for(let i=1;i<5;i++){
        	if(mapc[x+i*mode[0]]){
            		if(mapc[x+i*mode[0]][y+i*mode[1]]==color){
                		count++;
            		}
            		else
            		{
                		break;
            		}
        	}
        
	}
	for(let j=1;j<5;j++){
		if(mapc[x-j*mode[0]]){	        
			if(mapc[x-j*mode[0]][y-j*mode[1]]==color){
                		count++;
			}
			else{
                		break;
            		}
        	}
        
    	}
    	if(count>=4){
		return value;
    	}
    	return 0;
}

function simpleRudimentaryAi(){
	zt_medai(map, 3);
}

function matrixAdd(matA, matB){
	let output = new Array(matA.length);
	for(let i = 0; i < matA.length; i++){
		output[i] = new Array(matA.length);
		for(let k = 0; k < matA.length; k++){
			output[i][k] = matA[i][k] + matB[i][k];	
		}
	}
	return output;
}

function zeroMatrix(length){
	let output = new Array(length);
	for(let i = 0; i < length; i++){
		output[i] = new Array(length);
		for(let k = 0; k < length; k++){
			output[i][k] = 0;
		}
	}
	return output;
}

function zt_medai(bBoard, turns){
	console.log('zt_medai called');
	let max_turns = turns;
	//
	//copy the board
	let mapc = new Array(bBoard.length);
	for(let i = 0; i < bBoard.length; i++){
		mapc[i] = new Array(bBoard.length);
		for(let k = 0; k < bBoard.length; k++){
			mapc[i][k] = bBoard[i][k];
		}
	}
	let cumulativeMap = zeroMatrix(bBoard.length);
	let vmap = assignValue(mapc);
	for(let i = 0; i < max_turns; i++){
		let p = maxPosition(vmap);
		mapc[p[0]][p[1]] = 'white';
		vmap = assignValue(mapc);
		let g = minPosition(vmap);
		mapc[g[0]][g[1]] = 'black';
		vmap = assignValue(mapc);
		if(i == max_turns - 1){
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
			if(max_v > g_weight - k_weight){
				p = max_p;
			}
			map[p[0]][p[1]] = chesscolor[step % 2];
			drawchess((p[0] * 30) + 15, (p[1] * 30) + 15, chesscolor[step % 2]);
			for(let k = 0; k < 4; k++){
				checkwin(p[0], p[1], chesscolor[step % 2], mode[k]);
			}
			step++;
			break;
		}
	}
	console.table(cumulativeMap);
	console.log(mapc);
	//console.table(map);
}
