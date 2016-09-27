
function points(x_control, y_control, radius, numberOfPoints)
{
	for(var i=0; i<numberOfPoints; i++) {
		var x = x_control[i];
		var y = y_control[i]; 	
		
		ctx.beginPath();
		ctx.arc(x + x, y, radius, 0, 2 * Math.PI, true);
		ctx.fill();

		ctx.moveTo(x, y);
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x_control = [20,40,200,250,260];
var y_control = [200, 400, 300, 240, 40];

points(x_control, y_control,6,5);
