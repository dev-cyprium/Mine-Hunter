// Queue 
var Queue = function() {
	this.queue = [];
}

Queue.prototype.enqueue = function(data) {
	this.queue.push(data);
}

Queue.prototype.dequeue = function() {
	return this.queue.shift();
}

Queue.prototype.isEmpty = function() {
	return this.queue.length == 0;
}

// Cell class
var Cell = function(x,y) {
	this.visible = false;
	this.value = 0;
	this.div = null;
	this.x = x;
	this.y = y;
};

// Game class
var Game = function() {
	this.rows = 10;
	this.cols = 10;
	this.counter = 0;

	this.board = new Array(this.rows)
	for(var i = 0; i < this.cols; i++) {
		this.board[i] = new Array(this.cols);
	}

	for(var i=0;i<this.rows;i++) {
		for(var j=0;j<this.cols;j++) {
			this.board[i][j] = new Cell(i,j);
		}
	}
};

var countMines = function(x,y,board,rows,cols) {
	var count = 0;
	for(var i = x-1; i <= x+1; i++) {
		for(var j = y-1; j <= y+1; j++) {
			if(i >= 0 && i < rows && j >= 0 && j < cols) {
				if(board[i][j].value == 10) count++;
			}
		}
	}
	return count;
}

Game.prototype.update = function() {
	for(var i=0;i < this.rows; i++) {
		for(var j=0; j < this.cols; j++) {
			if(this.board[i][j].visible) {
				if(this.board[i][j].value > 0) $(this.board[i][j].div).text(this.board[i][j].value);
				$(this.board[i][j].div).css("background","#bfbfbf");
				var color = "black";
				switch(this.board[i][j].value) {
					case 1:
						color = "blue";
						break;
					case 2:
						color = "red";
						break;
					case 3:
						color = "brown";
						break;
					case 4:
						color = "purple";
						break;
					case 5:
						color = "green";
						break;
					case 6:
						color = "crimson";
						break;
					case 7:
						color = "yellow";
						break;
					case 8:
						color = "indigo";
						break;
					case 10:
						$(this.board[i][j].div).text("*");
						var html = "<img src='assets/flag.png' width='40' height='60'>"
						$(this.board[i][j].div).html(html);
						break;
				}
				$(this.board[i][j].div).css("color",color);
			}
		}
	}
};

Game.prototype.populate = function(cx, cy) {
	var mines = 20;

	// create an empty location around cursor without mines
	// TODO: FIX cornet cases!!! important
	var xoffset = 1;
	var yoffset = 1;
	for(var i = cx-xoffset; i <= cx+xoffset; i++) {
		for(var j = cy-yoffset; j <= cy+yoffset; j++) {
			if (i >= 0 && j >= 0 && i < this.rows && j < this.cols) {
				this.board[i][j].value = -1;
			}
		}
	}

	// Generate minefield
	for(var i = 0; i < mines; i++) {
		do {
			r = Math.floor(Math.random()*this.rows);
			c = Math.floor(Math.random()*this.cols);
		} while(this.board[r][c].value != 0);
		this.board[r][c].value = 10;
	}

	// Populate the board with numbers
	for(var i = 0; i < this.rows; i++) {
		for(var j = 0; j < this.cols; j++) {
			if (this.board[i][j].value == 10) continue;
			if (this.board[i][j].value == -1) {
				this.board[i][j].value = 0;
			}
			this.board[i][j].value = countMines(i,j,this.board,this.rows,this.cols);
		}
	}

};

Game.first_click = true


// game instance
var game = new Game();

var onFieldClick = function() {
	/* <div id="cell-i-j"></div> */
	row = parseInt($(this).attr('id').charAt(5));
	col = parseInt($(this).attr('id').charAt(7));

	// TODO: Add validity check so users didn't change IDs
	// TODO: Ask the server for the board data

	// TEMP -> jQuery generated game
	if(Game.first_click) {
		Game.first_click = false;
		game.interval = setInterval(function() {
			$('#time time').text(game.counter);
			game.counter++;
		}, 1000);
		game.populate(row,col);
	}
	reveal(row, col);
	game.update(row, col);
	
}

var getNeighbours = function(cell, visited) {
	var neighbours = [];

	for(var i = cell.x - 1; i <= cell.x + 1; i++) {
		for(var j = cell.y - 1; j <= cell.y + 1; j++) {
			 if(i >= 0 && i < game.rows && j >= 0 && j < game.cols) {
				if (i == cell.x && j == cell.y) continue;
				var nb = game.board[i][j];
				if($.inArray(nb, visited) != -1) continue;
				neighbours.push(nb);
			}
		}
	}

	return neighbours;
}

var reveal = function(cx, cy) {
	var queue = new Queue();
	var visited = [];
	visited.push(game.board[cx][cy]);
	queue.enqueue(game.board[cx][cy]);
	while(!queue.isEmpty()) {
		var cell = queue.dequeue();
		visited.push(cell);
		cell.visible = true;
		if (cell.value > 0) continue;
		var neighbours = getNeighbours(cell, visited);
		for(var i=0;i < neighbours.length; i++) {
			queue.enqueue(neighbours[i]);
		}
	}
}

var generateBoard = function() {
	var totalWidth = 600;
	var totalHeight = 600;
	var rows = 10;
	var cols = 10;
	for(var i=0; i < rows; i++) {
		for(var j=0; j < cols; j++) {
			var $div = $("<div>", {id: 'cell-'+i+'-'+j, class: "cell"});
			var w = totalWidth/rows;
			var h = totalHeight/cols;
			$div.css("width",w+"px");
			$div.css("height",h+"px");
			$div.hide();
			$div.click(onFieldClick);
			game.board[i][j].div = $div;
			$('#game').append($div);
		}
	}
	$('.cell').each(function( index ) {
		var d = index * 10;
		$(this).delay(d).fadeIn(400);
	});
}

var startgame = function() {
	generateBoard();
}

var main = function() {
	$("#start").click(function() {
		$(this).off();
		$('.ui').animate(
			{height: 0},1000
		).promise().then(function() { 
				$('.ui').hide(); 
				startgame(); 
			});
	});
}

$(document).on('page:load',function() {
	// Reset on page:load ( the page dosn't get refreshed )
	Game.first_click = true;
	clearInterval(game.interval);
	game.counter = 0;
	main();
});
$(document).ready(main);