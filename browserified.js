(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function fence(start, end, count) {
    if (count<2) {
        throw new Error("Count must be two or higher");
    }
    var distance = (end-start) / (count - 1);

    var xCoordinates = []; 
    for (var n=0; n<count; n++) {
        var xn = start + n * distance;
        xCoordinates.push(xn);
    }
    return xCoordinates;
}

module.exports = fence;

},{}],2:[function(require,module,exports){
var fence = require('fence');
var lib = require('./lib');
var drawRope = require('./lib').drawRope;
var sinusShape = require('./lib').sinusShape;

var canvas = document.getElementById("myCanvas");
window.ctx = canvas.getContext("2d");

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


},{"./lib":3,"fence":1}],3:[function(require,module,exports){

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
//	console.log('yps=', yps); 
	return yps;
}

module.exports = {
    drawRope: drawRope,
    sinusShape: sinusShape
};

},{}]},{},[2]);
