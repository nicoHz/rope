
function drawRope(horizontalPositions, verticalPositions, radius, colorFill, colorStyle) {
	if (horizontalPositions.length !== verticalPositions.length) {
		throw new Error("horizontalPositions.length does not match verticalPositions.length");
	}

	var oldx, oldy;
	ctx.strokeStyle = colorStyle;
	ctx.fillStyle = colorFill;
	
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

function sinusShape(xps, t) { // weiteres Element könnte die Amplitude sy sein 	
	var yps = []; 
	var sy = 120;

	for (var i=0; i < xps.length; i++) {
		var y = Math.sin(xps[i] * Math.PI/180 + t) * sy + 180; 
		yps.push(y);

		/* 
		   y = sin(x * sx + tx) * sy + ty
sx: in x richtung skaliert = frequnz auf x achse // bei x * 2 ist die Frequenz doppelt so hoch 
sy: skalierung der amplitude
ty: verschiebt nach oben bzw. unten
tx: translation links, rechts
		 */
	}
	console.log('yps=', yps); 
	return yps;
}

function fence(start, end, count) {
	if (count<2) {
		throw new Error("Count must be two or higher");
	}
	var distance = (end-start) / (count -1);
	var singleXs = [];
	for (var n=0; n < count; n++) {
		var xn = start + n * distance; 
		singleXs.push(xn);
	}
	return singleXs;
}

function arrayCompare(array1, array2) {
	if (array1.length != array2.length) {
		return false;
	}
	for (var i = 0; i < array1.length; i++) {
		if (array1[i] != array2[i]) {
			return false;
		}
	}
	return true;
}

