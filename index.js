
unitTests();


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x_positions = fence(20,890,50);
/* Übergabe des Array x_position an function sinusShape
   und zuweisung des return-wertes von sinusShape an y_positions.
 */
function drawFrame(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	function shadowedSineWave() {

		for (var i = 0; i < 10; i++) {
			var dt = i * 0.08;
			ctx.globalAlpha = i * 0.1;
			var y_positions = sinusShape(x_positions, Date.now()/1000 + dt); 
			drawRope(x_positions, y_positions, 6, "#e04c52", "#e04c52");

//			console.log("number of sine wave: " + i + "ty: " + dt + "gA: " + ctx.globalAlpha);
		}
	} 
	shadowedSineWave();

	ctx.globalAlpha = 1;
	y_positions = sinusShape(x_positions, Date.now()*2/1000 + 3.14); 
	drawRope(x_positions, y_positions, 6, "#296AE3", "#296AE3");

	ctx.globalAlpha = 0.6;
	y_positions = sinusShape(x_positions, Date.now()/1000 + 2); 
	drawRope(x_positions, y_positions, 1, "black", "black");
}

setInterval(drawFrame, 20);

