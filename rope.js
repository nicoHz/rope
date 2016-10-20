
function drawRope(horizontalPositions, verticalPositions, radius){
	if (horizontalPositions.length !== verticalPositions.length) {
		throw new Error("horizontalPositions.length does not match verticalPositions.length");
	}

	var oldx, oldy;
	for(var i=0; i<=horizontalPositions.length; i++) {
		var x = horizontalPositions[i];
		var y = verticalPositions[i];
		
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.fill();

		if (i !== 0) {
			ctx.moveTo(x, y); 
			ctx.lineTo(oldx, oldy); 
			/* das objekt ctx hat die eigenschaft lineTo,
			die eine funktion ist. die funktion lineTo wird 
			mir zwei parametern aufgerufen: werte oldx, oldy 
			*/
			ctx.stroke();
		}

		oldx = x;
		oldy = y;
	}
}

function sinusShape(xps) {	
	var yps = []; 
	for (var i=0; i< xps.length; i++) {

		var y = Math.sin(xps[i] * Math.PI/180) * -120 + 180;
		yps.push(y);
		/* 
		y = sin(x * sx + tx) * sy + ty
		sx: in x richtung skaliert = frequnz auf x achse 
		sy: skalierung der amplitude
		ty: verschiebt nach oben bzw. unten
		tx: transmission links, rechts
		*/
	}
	console.log('yps=', yps); 

	return yps;
}

function x_positionsControl(start, end, count) {
	if (count<2) {
		throw new Error("Count must be two or higher");
	}
	var distance = (end-start) / (count -1);
	var singleXs = [];
	for (var n=0; n<count; n++) {
		var xn = start + n * distance; 
		singleXs.push(xn);
	}
	console.log(singleXs);
	return singleXs;
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x_positions = x_positionsControl(70, 280, 7);
var y_positions = sinusShape(x_positions);
/* Übergabe des Arrayis x_position an function sinusShape
und zuweisung des return-wertes von sinusShape an y_positions.
*/

drawRope(x_positions, y_positions, 6);

// test-block for function x_positionsControl 
var test1 = x_positionsControl(3, 8, 2);
console.log(test1);
if (test1 + "" !== "3,8") {
	console.log("Test failed. Expected [3,8]");
}

