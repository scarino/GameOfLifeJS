var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

var grid = new Array();
var unitWidth = 10;
var unitHeight = 10;
var numX = 50;
var numY = 50;

//create empty grid
for(var i = 0; i < numY; i++){
	grid[i] = new Array();
}

//populate array with random 1 or 0
for(var i = 0; i < numY; i++){
	for(var j = 0; j < numX; j++){
		var ran = Math.random() * 11;
		
		if(ran <= 3){
			grid[i][j] = 1;
		}
		else{
			grid[i][j] = 0;
		}
	}
}

function countNeighbours(x,y){

	var count = 0;
	if(y == 0){
		if(x < numX - 1){
			if(grid[y+1][x+1] == 1){
				count++;
			}
		}
		if(grid[y+1][x] == 1){
			count++
		}
		if(x > 0){
			if(grid[y+1][x-1] == 1){
				count++;
			}
		}
	}
	else if(y == numY - 1){
		if(x < numX - 1){
			if(grid[y-1][x+1] == 1){
				count++;
			}
		}
		if(grid[y-1][x] == 1){
			count++
		}
		if(x > 0){
			if(grid[y-1][x-1] == 1){
				count++;
			}
		}
	}
	else if(x == 0){
		if(y > 0){
			if(grid[y-1][x+1] == 1){
				count++;
			}
		}
		if(grid[y][x+1] == 1){
			count++
		}
		if(y < numY - 1){
			if(grid[y+1][x+1] == 1){
				count++;
			}
		}
	}
	else if(x == numX - 1){
		if(y > 0){
			if(grid[y-1][x-1] == 1){
				count++;
			}
		}
		if(grid[y][x-1] == 1){
			count++
		}
		if(y < numY - 1){
			if(grid[y+1][x-1] == 1){
				count++;
			}
		}
	}
	else{
		if(grid[y][x - 1] == 1){
			count++;
		}
		if(grid[y-1][x] == 1){
			count++
		}
		if(grid[y-1][x-1] == 1){
			count++;
		}
		if(grid[y][x + 1] == 1){
			count++;
		}
		if(grid[y+1][x] == 1){
			count++
		}
		if(grid[y+1][x+1] == 1){
			count++;
		}
		if(grid[y-1][x+1] == 1){
			count++;
		}
		if(grid[y+1][x-1] == 1){
			count++;
		}
	}
	
	return count;
}

function think(){

	var tempArray = new Array();
	for(var i = 0; i < numY; i++){
		tempArray[i] = new Array();
		for(var j = 0; j < numX; j++){
			tempArray[i][j] = grid[i][j];
		}
	}
	
	for(var i = 0; i < numY; i++){
		for(var j = 0; j < numX; j++){
			var numN = countNeighbours(j, i);
			if(grid[i][j] == 1){
				if(numN < 2){
					tempArray[i][j] = 0;
				}
				else if(numN < 4){
					tempArray[i][j] = 1;
				}
				else if(numN > 3){
					tempArray[i][j] = 0;
				}
			}
			else{
				if(numN == 3){
					tempArray[i][j] = 1;
				}
				else{
					tempArray[i][j] = 0;
				}
			}
		}
	}
	
	for(var i = 0; i < numY; i++){
		for(var j = 0; j < numX; j++){
			grid[i][j] = tempArray[i][j];
		}
	}
	
}

function drawGrid(){
	for(var i = 0; i < numY; i++){
		for(var j = 0; j < numX; j++){
		
			if(grid[i][j] == 1){
				ctx.fillRect(j * unitWidth, i * unitHeight,unitWidth,unitHeight);
			}
			else{
				ctx.clearRect(j * unitWidth, i * unitHeight,unitWidth,unitHeight);
				ctx.strokeRect(j * unitWidth, i * unitHeight,unitWidth,unitHeight);
			}
		}
	}
}

function run(){
	drawGrid();
	think();
}

function start(){
	gameLoop = setInterval(run,250);
	drawGrid();
	
	$(document).keydown(function(evt) {
		
		if (evt.keyCode == 32){
			think();
			drawGrid();
		}
	});	
}

start();

