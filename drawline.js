/**
*	global variables
*/
//board element
let board=document.querySelector("#board");

//get the context of the board
let context=board.getContext("2d");

//set the style
context.strokeStyle="#000000";

/*
*	Window On Load
*	@author Tao Yang
*	@since 10/21/2020
*	@last_modified 11/4/2020
*	@Brief Setup the game
*/
//run this function on load
window.onload=function()
{
    //
    //load the images for scoreBoard
    scoreBoardImages();
    
    //
    //setup simpleAi
    simpleAiSetup();

    drawline();
}
//draw the line of board 
/*
*	Draw Line
*	@author Tao Yang
*	@since 10/21/2020
*	@last_modified 10/21/2020
*	@Brief Draws the background for the game
*/
/**
*	@pre must have valid board and context elements
*	@post creates the graphic for the board
*/
function drawline()
{
    //draw the lines
    for(let i=0;i<15;i++)
    {
        context.beginPath();
        context.moveTo(i*30+15,15);
        context.lineTo(i*30+15,435);
        context.stroke();
        context.moveTo(15, i*30+15);
        context.lineTo(435, i*30+15);
        context.stroke();
    }
    context.fillStyle = 'black';
    
    //draw the four circles
    context.beginPath();
    context.arc(105,105,3,0,Math.PI*2,false);
    context.fill();
    context.stroke();
    
    context.beginPath();
    context.arc(105,345,3,0,Math.PI*2,false);
    context.fill();
    context.stroke();
    
    context.beginPath();
    context.arc(345,105,3,0,Math.PI*2,false);
    context.fill();
    context.stroke();
    
    context.beginPath();
    context.arc(345,345,3,0,Math.PI*2,false);
    context.fill();
    context.stroke();
}
