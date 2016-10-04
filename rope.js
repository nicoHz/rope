
function drawSine(numberOfCircles, horizontalPositions, verticalPositions, radius)
{
/*	if (horizontalPositions.length !== verticalPositions.length) {
		throw new Error("horizontalPositions.length does not match verticalPositions.length");
	}
*/
	var oldx, oldy;
	for(var i=0; i<numberOfCircles; i++) {
		var x = horizontalPositions[i];
		var y = verticalPositions[i];
		
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.fill();

		if (i !== 0) {
			ctx.moveTo(x, y); 
			ctx.lineTo(oldx, oldy);
			ctx.stroke();
		}

		oldx = x;
		oldy = y;
	}
}


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var t = 50;
var x_positions = t + 5; 
var y_positions = Math.sin(t + 0.5); 

drawSine(100, x_positions, y_positions,6);

