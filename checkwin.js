var flag=false;
var mode=
[
    [1,0],
    [0,1],
    [1,1],
    [1,-1],
];

function checkwin(x,y,color,mode)
{
    var count =0;
    for(var i=1;i<5;i++)
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
    for(var j=1;j<5;j++)
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
        alert(color + " win!" );
        flag=true;
    }
}