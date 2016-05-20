// Game class
var Game = function() {
	var rows = 10;
	var cols = 10;

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
				color = "yellow";
				break;
			case 4:
				color = "pink";
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


var onFieldClick = function() {
	/* <div id="cell-i-j"></div> */
	row = parseInt($(this).attr('id').charAt(5));
	col = parseInt($(this).attr('id').charAt(7));

	// TODO: Add validity check so users didn't change IDs
	// TODO: Ask the server for the board data

	// TEMP -> jQuery generated game
	if(Game.first_click) {
		Game.first_click = false;
		game = new Game();
	} else {
		game.reveal(this, 1 + Math.floor(Math.random()*7));
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

$(document).on('page:load',main);
$(document).ready(main);