
var can=document.getElementById("snake-land");
var ctx = can.getContext("2d");

var snakeLength=3;
var dd=10;
var snakeArray=new Array(snakeLength);
	snakeArray=[[2+2,2],[2+1,2],[2,2]];
var current_direction = "right";
var next_direction = current_direction;
var sheight = can.height/dd;
var swidth = can.width/dd;
var tx = 5; ty = 10;
var old_tx = tx, old_ty = ty;
var digesting = 0;
var LOOP;
var playing = false;
var interval = 40; // Game Level

paint();
function init()
{
	snakeLength=3;
	snakeArray=new Array(snakeLength);
		snakeArray=[[2+2,2],[2+1,2],[2,2]];
	current_direction = "right";
	next_direction = current_direction;
	tx = 5; ty = 10;
	old_tx = tx, old_ty = ty;
	digesting = 0;
	document.getElementById("score").innerHTML=String(snakeLength-3);

	paint();
}
function paint()
{
	var head = snakeArray[0];
	//clear the old frame
	ctx.clearRect(0,0,can.width,can.height);

	//draw black border
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, can.width, can.height);

	//draw snake head
	ctx.fillStyle = "#006666"
	ctx.fillRect(head[0]*dd-dd+1,head[1]*dd-dd+1,dd-2,dd-2);

	//draw snake body
	ctx.fillStyle = "#33CCCC";
	for(var i=1; i<snakeArray.length; i++)
	{
		var lux = snakeArray[i][0]*dd-dd;
		var luy = snakeArray[i][1]*dd-dd;
		// ctx.strokeRect(lux+0.5,luy+0.5,dd-1,dd-1);
		ctx.fillRect(lux+1,luy+1,dd-2,dd-2);	    
	}

	//draw apple
	ctx.fillStyle = "red";
	ctx.fillRect(tx*dd-dd+1, ty*dd-dd+1, dd-2,dd-2);
}

function isDead()
{
	var head = snakeArray[0];
	if(head[0] > swidth || head[1] > sheight || head[0] < 1 || head[1] < 1)	
	{
		return true;
	}

	for(var i=1; i<snakeArray.length; i++)
	{
		if(head[0] === snakeArray[i][0] && head[1] === snakeArray[i][1])
		{
			return true;
		}
	}
}


function AppleGen(){
	do
	{
		var isok = true;
	    tx = Math.round(Math.random()*(swidth-1)+1);
	    ty = Math.round(Math.random()*(sheight-1)+1);
		for(i=0; i<snakeArray.length; i++)
		{
			if(tx===snakeArray[i][0] && ty===snakeArray[i][1])
			{
				isok = false;
				break;
			}
		}
	}
	while(!isok)
}
function MoveSnake()
{
	var head = snakeArray[0];
	var tail = snakeArray[snakeArray.length-1]

	if(head[0]===tx && head[1]===ty)
	{
		digesting += 1;
		AppleGen();
	}

	if(next_direction === "right")
	{
		var newHead = [head[0]+1, head[1]];
	}
	else if(next_direction === "left")
	{
		var newHead = [head[0]-1, head[1]];
	}
	else if(next_direction === "up")
	{
		var newHead = [head[0], head[1]-1];
	}
	else if(next_direction === "down")
	{
		var newHead = [head[0], head[1]+1];
	}
	current_direction=next_direction;
	snakeArray.unshift(newHead);
	if(tail[0]===old_tx && tail[1]===old_ty && digesting>0)
	{
		snakeLength=snakeArray.length;
		document.getElementById("score").innerHTML=String(snakeLength-3);
		digesting -= 1;
		old_tx=tx;
		old_ty=ty;
	}
	else
	{
		snakeArray.pop();
	}
}
function main()
{
	MoveSnake();
	if(isDead()){
		playing=false;
		clearInterval(LOOP);
		document.getElementById("over").style.display="inline";
		return 0;}
	paint();
}

document.onkeydown = function (event) 
{
	var e = event || window.event;
	var keyCode = e.keyCode || e.which;
	// console.log(keyCode);	

	if(current_direction==="right" || current_direction==="left")
	{
		switch(keyCode)
		{
			case(38):{next_direction="up";break;}
			case(87):{next_direction="up";break;}
			case(40):{next_direction="down";break;}
			case(83):{next_direction="down";break;}
		}
	}
	else if(current_direction==="up" || current_direction==="down")
	{
		switch(keyCode)
		{
			case(37):{next_direction="left";break;}
			case(65):{next_direction="left";break;}
			case(39):{next_direction="right";break;}
			case(68):{next_direction="right";break;}
		}
	}
}	

document.getElementById("start").onclick = function()
{
	if(!playing)
	{
	playing=true
	document.getElementById("over").style.display="none";
	init();
	LOOP = setInterval('main()', interval);}
}

  







