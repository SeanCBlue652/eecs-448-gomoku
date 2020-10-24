let btn =document.querySelector("#btn");
btn.addEventListener("click",function()
{
    newgame();
})

//clean the board
//this place have some problem need to solve
function cleanBoard() 
{
    context.fillStyle = "#e7be72";
    context.fillRect(0, 0, board.width, board.height);
}

//start new game
function newgame()
{
    for(let i=0;i<15;i++)
    {
        map[i]=[];
        for(let j=0;j<15;j++)
        {
            map[i][j]=0;
        }
    }
    cleanBoard();
    drawline();
    over=false;
}

