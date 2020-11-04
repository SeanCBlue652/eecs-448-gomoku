
let chesscolor=['black','white'];
let step=0;
let map=[];
for(let i=0;i<15;i++)
{
    map[i]=[];
    for(let j=0;j<15;j++)
    {
        map[i][j]=0;
    }
}
//draw chess
function drawchess (x,y,color)
{

    context.beginPath();
    context.arc(x,y,13,0,Math.PI*2,false);
    context.closePath();
    context.fillStyle = color;
    context.fill();
}
//place the chess
//not finish do not do the function: the position has already place chess
board.addEventListener('click',function(a)
{
    let dx=Math.floor((a.offsetX)/30)*30+15;//15
    let dy=Math.floor((a.offsetY)/30)*30+15;
    lock_aiSwitch = true;
    
    if(!flag && !aiSwitch){
    	console.log('normal_play');
	if(map[(dx-15)/30][(dy-15)/30]==0){
		drawchess(dx,dy,chesscolor[step%2]);
		map[(dx-15)/30][(dy-15)/30]=chesscolor[step%2];
		for(let i=0;i<4;i++)
		{
	  	  checkwin((dx-15)/30,(dy-15)/30, chesscolor[step%2],mode[i]);
		}
		step++;
	}
    }
    else if(!flag && aiSwitch){
    	//normal code
    	console.log('ai_play');
    	if(map[(dx-15)/30][(dy-15)/30] == 0){
    		drawchess(dx, dy, chesscolor[step % 2]);
    		map[(dx-15)/30][(dy-15)/30] = chesscolor[step % 2]
    		for(let i = 0; i < 4; i++){
    			checkwin((dx-15)/30,(dy-15)/30, chesscolor[step % 2],mode[i]);
    		}
    		let u = Math.floor((dx-15)/30);
    		let v = Math.floor((dy-15)/30);
    		console.log("u: " + u + " v: " + v);
    		for(let i = 0; i < pos_cache.length; i++){
			if(pos_check([u, v], pos_cache[i])){
				pos_cache.splice(i, 1);
				break;
			}
		}
    		step++;
    		
    	//call ai
    	///////////////////////////////
    	/////NOT IMPLEMENTED YET///////
    	///////////////////////////////
    	
    	//this is a random ai
    	simpleRandomAi();
    		
    		
    	}        
    }
    
    if(flag)
    {       
        alert("Game is over, please start new game");
        return;
    }
});
