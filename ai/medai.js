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
				output[i][k] += gt_checkwin(i, k, 'white', mode[q], bBoard, 1000);
				output[i][k] += gt_checkwin(i, k, 'black', mode[q], bBoard, 5000);
				if(bBoard[i][k] == 'white' || bBoard[i][k] == 'black'){
					output[i][k] = 0;
				}
			}
			if(map[i][k] == 'white'){
				for(let v = i - 1; v < i + 2; v++){
					for(let u = k - 1; u < k + 2; u++){
						zt_assign(bBoard, output, u, v, 100, k + 2, i + 2)
					}
				}
			}
			else if(map[i][k] == 'black'){
				for(let v = i - 1; v < i + 2; v++){
					for(let u = k - 1; u < k + 2; u++){
						zt_assign(bBoard, output, u, v, 75, k + 2, i + 2)
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
		if(bBoard[v][u] != 'white' && bBoard[v][u] != 'black'){
			dBoard[v][u] += value;
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
				maxP = [k, i];
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
				minP = [k, i];
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

function zt_medai(bBoard){
	console.log('zt_medai called');
	let max_turns = 12;
	//
	//copy the board
	let mapc = new Array(bBoard.length);
	for(let i = 0; i < bBoard.length; i++){
		mapc[i] = new Array(bBoard.length);
		for(let k = 0; k < bBoard.length; k++){
			mapc[i][k] = bBoard[i][k];
		}
	}
	
	let vmap = assignValue(mapc);
	for(let i = 0; i < max_turns; i++){
		let p = maxPosition(vmap);
		mapc[p[0]][p[1]] = 'white';
		let g = minPosition(vmap);
		mapc[g[0]][g[1]] = 'black';
		vmap = assignValue(mapc);
		if(i == max_turns - 1){
			console.log(p);
			map[p[1]][p[0]] = chesscolor[step % 2];
			drawchess((p[1] * 30) + 15, (p[0] * 30) + 15, chesscolor[step % 2]);
			for(let k = 0; k < 4; k++){
				checkwin(p[1], p[0], chesscolor[step % 2], mode[k]);
			}
			step++;
			break;
		}
	}
	console.log(vmap);
	//console.table(map);
}
