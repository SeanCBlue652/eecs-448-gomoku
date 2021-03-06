/**
*	Global Variables
*/
//marks the state of the game
let flag=false;

//mode for chaning between horizontal, vertial, diagonal left and right
let mode=
[
    [1,0],
    [0,1],
    [1,1],
    [1,-1],
];

/*
*	Checkwin
*	@author Tao Yang
*	@since 10/22/2020
*	@last_modified 10/24/2020
*	@Brief Checks position and alerts player if someone wins
*/
/**
*	@param x Integer X position
*	@param y Integer Y position
*	@param color String color of the marker to check for
*	@param mode Object check for certain positions
*	@pre must have valid map and position
*	@post assigns the flag and alerts the player of win
*/
function checkwin(x,y,color,mode)
{
    let count =0;
    for(let i=1;i<5;i++)
    {
        if(map[x+i*mode[0]])
        {
            if(map[x+i*mode[0]][y+i*mode[1]]==color)
            {
                count++;
            }
            else
            {
                break;
            }
        }
        
    }
    for(let j=1;j<5;j++)
    {
        if(map[x-j*mode[0]])
        {
            if(map[x-j*mode[0]][y-j*mode[1]]==color)
            {
                count++;
            }
            else
            {
                break;
            }
        }
        
    }
    if(count>=4)
    {
    	//
    	//update the score
    	updateScore(color);
    
        alert(color + " win!" );
        flag=true;
    }
    return(flag);
}
