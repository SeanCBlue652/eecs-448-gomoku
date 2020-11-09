/**
*	Global variables
*/

//store sthe color in a array
let chesscolor=['black','white'];

//steps through color
let step=0;

//creates a zerofilled 2D array
let map=[];
let isBlack=true;

/*
*	TT
*	@author Tao Yang
*	@since 11/8/2020
*	@last_modified 11/8/2020
*	@Brief Handles the Change color switch
*/
/**
*	@param id String id of a document element
*	@pre must have document loaded
*	@post assigns a value to isBlack boolean
*/
function tt(id)
{
	let aa=document.getElementById(id);
	//assign values based on selected value
	if(aa.value=="Black")
	{
		isBlack=true;
	}
	else if (aa.value=="White")
	{
		isBlack=false;
	}
}

//fill in the array
for(let i=0;i<15;i++)
{
    map[i]=[];
    for(let j=0;j<15;j++)
    {
        map[i][j]=0;
    }
}

/*
*	Draw Chess
*	@author Tao Yang
*	@since 10/22/2020
*	@last_modified 10/22/2020
*	@Brief Draws the piece at a specific location and color
*/
/**
*	@param x Integer X position
*	@param y Integer Y position
*	@param color String color
*	@pre must have context loaded
*	@post draws a circle onto context
*/
//draw chess
function drawchess (x,y,color)
{
    //draw a circle
    context.beginPath();
    context.arc(x,y,13,0,Math.PI*2,false);
    context.closePath();
    context.fillStyle = color;
    context.fill();
}
//place the chess
//not finish do not do the function: the position has already place chess
/*
*	Board Event Listener
*	@author Tao Yang
*	@since 10/22/2020
*	@last_modified 11/8/2020
*	@Brief Adds event listener and executes main code
*/
board.addEventListener('click',function(a)
{
    //calculate the position
    let dx=Math.floor((a.offsetX)/30)*30+15;//15
    let dy=Math.floor((a.offsetY)/30)*30+15;
    
    //lock the controls for ai switch
    lock_aiSwitch = true;
    
    //game without ai
    if(!flag && !aiSwitch){
    	//console.log('normal_play');
    	
    	//check if the position is valid
	if(map[(dx-15)/30][(dy-15)/30]==0){
		//draw the piece
		drawchess(dx,dy,chesscolor[step%2]);
		//assign to map
		map[(dx-15)/30][(dy-15)/30]=chesscolor[step%2];
		//check if the piece wins the game
		for(let i=0;i<4;i++)
		{
			drawchess(dx,dy,chesscolor[step%2]);
			map[(dx-15)/30][(dy-15)/30]=chesscolor[step%2];
			for(let i=0;i<4;i++)
			{
	  	  	if(checkwin((dx-15)/30,(dy-15)/30, chesscolor[step%2],mode[i])) {return;};
			}
		}
		//step through
		step++;
	}
    }
    //game with ai
    else if(!flag && aiSwitch){
    	//normal code
    	//console.log('ai_play');
    	//check if the position is valid
    	if(map[(dx-15)/30][(dy-15)/30] == 0){
    		//draw the piece
    		drawchess(dx, dy, chesscolor[step % 2]);
    		//assign to map
    		map[(dx-15)/30][(dy-15)/30] = chesscolor[step % 2]
    		//check if the piece wins the game
    		for(let i = 0; i < 4; i++){
    			if(checkwin((dx-15)/30,(dy-15)/30, chesscolor[step % 2],mode[i])) {return;};
    		}
    		//reduce the position cache for simpleAi
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
    	
    	//this is a random ai
    	//work only if the game has not won
	if(!flag){
		//simpleRandomAi();
		//run the ai
    		simpleRudimentaryAi();
    	}
    	//else step through once more
    	else if(flag){
    		step++;
    	}
    		
    		
    	}        
    }
    
    //tell the user that the game has won and has been declared over
    if(flag)
    {       
        alert("Game is over, please start new game");
        return;
    }
});
