
function circles(horizontalPositions, verticalPositions, radius)
{
	if (horizontalPositions.length !== verticalPositions.length) {
		throw new Error("horizontalPositions.length does not match verticalPositions.length");
	}

	var oldx, oldy;
	for(var i=0; i<horizontalPositions.length; i++) {
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
var x_positions = [20, 40, 200, 250, 260];
var y_positions = [200, 400, 300, 240, 40]; 

circles(x_positions, y_positions,6);
