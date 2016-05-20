$(document).ready(function(){
	main();
});


var generateBoard = function() {
	var $div = $("<div>", {id: 1, class: "cell"});
	var w = 50;
	var h = 50;
	$div.css("width",w+"px");
	$div.css("height",h+"px");
	$('#game').append($div);
}

var startgame = function() {
	generateBoard();
}

var main = function() {
	$("#start").click(function() {
		$('.ui').animate(
			{height: 0},1000
		).promise().then(function() { 
				$('.ui').hide(); 
				startgame(); 
			});
	});
}