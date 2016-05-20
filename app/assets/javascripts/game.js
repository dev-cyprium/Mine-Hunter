$(document).on('page:load',function(){
	main();
});


var generateBoard = function() {
	var totalWidth = 600;
	var totalHeight = 600;
	for(var i=0; i < 16; i++) {
		for(var j=0; j < 16; j++) {
			var $div = $("<div>", {id: 1, class: "cell"});
			var w = totalWidth/16;
			var h = totalHeight/16;
			$div.css("width",w+"px");
			$div.css("height",h+"px");
			$('#game').append($div);
		}
	}
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