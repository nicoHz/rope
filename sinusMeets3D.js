
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

for (x=0; x<=360; x+=1) {
	ctx.moveTo(0,180);
	var y = -Math.sin(x * Math.PI/180 + 3) * 120 + 180; 
	ctx.lineTo(x,y);
}
ctx.stroke();


