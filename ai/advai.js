//still need to work, this ai can not work, something need to fix
let myWin=[];
let comWin=[];
let win=[];
let wincount=0;
let color=true;

for(let i=0;i<15;i++)
{
    win[i]=[];
    for(let j=0;j<15;j++)
    {
        win[i][j]=[];
    }
}

//horizontal win way
for(let i=0;i<15;i++)
{
    for(let j=0;j<11;j++)
    {
        for(let k=0;k<5;k++)
        {
            win[i][j+k][wincount]=true;
        }
        wincount++;
    }
}

//vertical win way
for(let i=0;i<15;i++)
{
    for(let j=0;j<11;j++)
    {
        for(let k=0;k<5;k++)
        {
            win[j+k][i][wincount]=true;
        }
        wincount++;
    }
}

//positive tilt win way
for(let i = 0 ; i < 11; i++) 
{
    for(let j = 0; j < 11; j++)
    {
        for(let k = 0; k < 5; k++) 
        {
            win[i+k][j+k][wincount] = true;
        }
        wincount++;
    }
}

//anti-tilt win way
for(let i = 0 ; i < 11; i++)
{
    for(let j = 14; j > 3; j--)
    {
        for(let k = 0; k < 5; k++)
        {
            win[i+k][j-k][wincount] = true;
        }
        wincount++;
    }
}


for(let i=0;i<wincount;i++)
{
    myWin[i]=0;
    comWin[i]=0;
}

if(flag)
{
    return;
}

for(let k=0;k<CountQueuingStrategy;k++)
{
    if(win[i][j][k])
    {
        myWin[k]++;
        comWin[k]=6;
        if(myWin[k]==5)
        {
            alert("You win!");
            flag=true;
        }
    }
}

if(!color)
{
    return;
}

map[i][j]=1;

function useadvAI()
{
    if(!flag)
{
    color=!color;
    advAI();
}
}


function advAI()
{
    let myScore=[];
    let comScore=[];
    let max=0;
    let a=0;
    let b=0;

    for(let i=0;i<15;i++)
    {
        myScore[i]=[];
        comScore[i]=[];
        for(let j=0;j<15;j++)
        {
            myScore[i][j]=0;
            comScore[i][j]=0;
        }
    }

    for(let i=0;i<15;i++)
    {
        for(let j=0;j<15;j++)
        {
            if(map[i][j]==0)
            {
                for(let k=0;k<wincount;k++)
                {
                    if(win[i][j][k])
                    {
                        if(myWin[k]==1)
                        {
                            myScore[i][j]=myScore[i][j]+100;
                        }
                        else if(myWin[k]==2)
                        {
                            myScore[i][j]=myScore[i][j]+200;
                        }
                        else if(myWin[k]==3)
                        {
                            myScore[i][j]=myScore[i][j]+500;
                        }
                        else if(myWin[k]==4)
                        {
                            myScore[i][j]=myScore[i][j]+800;
                        }
                        if(comWin[k]==1)
                        {
                            comScore[i][j]=comScore[i][j]+120;
                        }
                        else if(comWin[k]==2)
                        {
                            comScore[i][j]=comScore[i][j]+220;
                        }
                        else if(comWin[k]==3)
                        {
                            comScore[i][j]=comScore[i][j]+560;
                        }
                        else if(comWin[k]==4)
                        {
                            comScore[i][j]=comScore[i][j]+860;
                        }
                    }
                }
                
            }
        }
    }
    for(let k=0;k<wincount;k++)
    {
        if(win[a][b][k])
        {
            comWin[k]++;
            myWin[k]=5;
            if(comWin[k]==5)
            {
                alert("AI win, you lost");
                flah=true;
            }
        }
    }
 
}

if(myScore[i][j]>max)
{
    max=myScore[i][j];
    a=i;
    b=j;
}
else if(myScore[i][j]==max)
{
    if(comScore[i][j]>comScore[a][b])
    {
        a=i;
        b=j;
    }
}

if(comScore[i][j]>max)
{
    max=comScore[i][j];
    a=i;
    b=j;
}
else if (comScore[i][j]==max)
{
    if(myScore[i][j]>myScore[a][b])
    {
        a=i;
        b=j;
    }
}
drawchess(a,b,false);
map[a][b]=2;
for(let k=0;k<count;k++)
{
    if(win[a][b][k])
    {
        comWin[k]++;
        myWin[k]=6;
        if(comWin[k]==5)
        {
            alert("AI win, keep working hard next time.");
            flag=true;
        }
    }
}

if(!flag)
{
    color=!color;
}

