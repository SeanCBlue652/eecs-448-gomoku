//assigns a button element
let btn = document.querySelector("#btn");

//on click reset the game
btn.addEventListener("click",function()
{
    newgame();
    simpleAiSetup();
})

//clean the board
//this place have some problem need to solve
/**
*	@pre must have context object loaded
*	@post redraws the board
*/
function cleanBoard() 
{
    context.fillStyle = "#e7be72";
    context.fillRect(0, 0, board.width, board.height);
}

//start new game
/**
*	@pre must have global variables loaded
*	@post zero fills the array and resets flags
*/
function newgame()
{
    //zerofill array
    for(let i=0;i<15;i++)
    {
        map[i]=[];
        for(let j=0;j<15;j++)
        {
            map[i][j]=0;
        }
    }
    //reset the board
    cleanBoard();
    drawline();
    over=false;
    flag=false;
}

