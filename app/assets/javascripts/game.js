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
			this.board[i][j] = 0;
		}
	}
};

var countMines = function(x,y,board,rows,cols) {
	var count = 0;
	for(var i = x-1; i <= x+1; i++) {
		for(var j = y-1; j <= y+1; j++) {
			if(i >= 0 && i < rows && j >= 0 && j < cols) {
				if(board[i][j] == 10) count++;
			}
		}
	}
	return count;
}

Game.prototype.populate = function(cx, cy) {
	var mines = 22;
	console.log(cx + "," + cy);

	// create an empty location around cursor without mines
	// TODO: FIX cornet cases!!! important
	var xoffset = 1;
	var yoffset = 1;
	for(var i = cx-xoffset; i <= cx+xoffset; i++) {
		for(var j = cy-yoffset; j <= cy+yoffset; j++) {
			if (i >= 0 && j >= 0 && i < this.rows && j < this.cols) {
				this.board[i][j] = -1;
			}
		}
	}

	// Generate minefield
	for(var i = 0; i < mines; i++) {
		do {
			r = Math.floor(Math.random()*this.rows);
			c = Math.floor(Math.random()*this.cols);
		} while(this.board[r][c] != 0);
		this.board[r][c] = 10;
	}

	// Populate the board with numbers
	for(var i = 0; i < this.rows; i++) {
		for(var j = 0; j < this.cols; j++) {
			if (this.board[i][j] == 10) continue;
			if (this.board[i][j] == -1) {
				this.board[i][j] = 0;
			}
			this.board[i][j] = countMines(i,j,this.board,this.rows,this.cols);
		}
	}

	// TEMP : show all numbers & mines
	/*
	for(var i = 0; i < this.rows; i++) {
		for(var j = 0; j < this.cols; j++) {
			$("#cell-"+i+"-"+j).text(this.board[i][j]);
		}
	} */
};

Game.prototype.reveal = function(div, num) {
	$(div).css("background-color","#d9d9d9");
	$(div).off();

	if (num > 0) {
		$(div).append(num);
		var color = "black";
		switch(num) {
			case 1:
				color = "blue";
				break;
			case 2:
				color = "red";
				break;
			case 3:
				color = "orange";
				break;
			case 4:
				color = "brown";
				break;
			case 5:
				color = "purple";
				break;
			case 6:
				color = "green";
				break;
			case 7:
				color = "magenta";
				break;

		}
		$(div).css("color",color);
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
		$('.cell').each(function( index ) {
			r = parseInt($(this).attr('id').charAt(5));
			c = parseInt($(this).attr('id').charAt(7));
			game.reveal(this, game.board[r][c]);
		});
	} else {
		// game.reveal(this, 1 + Math.floor(Math.random()*7));
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