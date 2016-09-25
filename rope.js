
function points(x, y, radius, numberOfPoints)
{
    for(var i=0; i<numberOfPoints; i++) {
		ctx.beginPath();
		ctx.arc(x * i + x, y, radius, 0, 2 * Math.PI, true);
		console.log(i);
		ctx.fill();

		ctx.moveTo(x,y);
		ctx.lineTo(x * i + x, y);
		ctx.stroke();
	}
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

points(70,60,6,5);
