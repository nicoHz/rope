
function circles(horizontalPositions, verticalPositions, radius)
{
	if (horizontalPositions.length !== verticalPositions.length) {
		throw new Error("horizontalPositions.length does not match verticalPositions.length");
	}

	for(var i=0, j=1; i<horizontalPositions.length; i++,j++) {
		var x = horizontalPositions[i];
		var y = verticalPositions[i]; 	
		
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.fill();

		ctx.moveTo(x, y); 
		ctx.lineTo(horizontalPositions[j], verticalPositions[j]);
		ctx.stroke();
	}
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x_positions = [20,40,200,250,260];
var y_positions = [200,400,300,240,40]; 

circles(x_positions, y_positions,6);
