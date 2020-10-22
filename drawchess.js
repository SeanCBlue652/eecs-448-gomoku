
var chesscolor=['black','white'];
var step=0;
//draw chess
function drawchess (x,y,color)
{
    context.fillStyle=color;
    context.beginPath();
    context.arc(x,y,13,0,Math.PI*2,false);
    context.fill();
    context.stroke();
}
//place the chess
//not finish do not do the function: the position has already place chess
board.addEventListener('click',function(a)
{
    var dx=Math.floor((a.offsetX)/30)*30+15;
    var dy=Math.floor((a.offsetY)/30)*30+15;
    drawchess(dx,dy,chesscolor[step%2]);
    step++;
})