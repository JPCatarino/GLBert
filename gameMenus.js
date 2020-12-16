// Game Status

function menu(){
	var textCanvas = document.querySelector("#text");
	var ctx = textCanvas.getContext("2d");
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "40px arcade";
    ctx.fillStyle = '#FFFFFF';
	ctx.fillText("PRESS ENTER TO START", 12, 450);
    ctx.drawImage(document.getElementById("glbertlogo"), 115 , 200);
}

function dead(){
	var textCanvas = document.querySelector("#text");
	var ctx = textCanvas.getContext("2d");
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "60px arcade";
	ctx.fillStyle = '#FFFFFF';
	ctx.fillText("GAME OVER", 140, 300);
	ctx.font = "30px arcade";
	ctx.fillText("PRESS RESET TO RESTART", 80, 350);
}

function win(){
	var textCanvas = document.querySelector("#text");
	var ctx = textCanvas.getContext("2d");
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "50px arcade";
	ctx.fillStyle = '#FFFFFF';
	ctx.fillText("LEVEL COMPLETED!", 20, 300);
	ctx.font = "25px arcade";
	ctx.fillText("POINTS: " + qbert.points, 280, 350);
	ctx.font = "30px arcade";
	ctx.fillText("PRESS RESET TO RESTART", 80, 400);
}

function gameInfoText(points, lives){
	var textCanvas = document.querySelector("#text");
	var ctx = textCanvas.getContext("2d");
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "15px arcade";
    ctx.fillStyle = '#FFFFFF';
	ctx.fillText("Player 1", 600, 90);
	ctx.fillText("Points:" + points, 600, 120);
	ctx.fillText("Lives:" + lives, 600, 150);
	ctx.fillText("Change To:", 600, 180);
    ctx.drawImage(document.getElementById("blockLevel1"),630, 180, 100, 100);
}