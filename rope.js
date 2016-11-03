
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

/*
function undulation() {
	var x = t;
	var y = 

	for (i = yAxis; i < width; i += 10) {
	}
}
*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x_positions = x_positionsControl(20, 890, 70);
var y_positions = sinusShape(x_positions);
/* Übergabe des Array x_position an function sinusShape
und zuweisung des return-wertes von sinusShape an y_positions.
*/


function unitTests() {
	function trivialCase() {
		var test = x_positionsControl(3, 8, 2);
		if (test[0] !== 3 || test[1] !== 8 || test.length !== 2) {
			console.log("Test failed. Expected [3,8]");
		}
		/* if (test1 + "" !== "3,8") {
		   console.log("Test failed. Expected [3,8]");
		   }
		 */
		// this is another way to test: turn complex values like arrays 
		// into strings so they can be compared 
	}

	function roundNum(numbers) {
		var roundNum = [];
		for (i=0; i<numbers.length; i++) {
			var x = Math.round(numbers[i]*100)/100;
			roundNum.push(x);
		}
		return roundNum;
	}

	function testRoundNum() {
		var num = roundNum([3, 8.25, 4.5555]);
		var expectNum = "3,8.25,4.56";
		if (num + "" !== expectNum) {
			console.log("Test failed. Expected an empty array.");
		}
	}

	function fuzzyNumArrayCompare(array1, array2) {
		var roundedArray1 = roundNum(array1);
		var roundedArray2 = roundNum(array2);
		if (roundedArray1 + "" == roundedArray2 + "") {
			return true;
		} else {
			return false;
		}
	}

	function testFuzzyNumArrayCompare() {
		if (fuzzyNumArrayCompare([], []) === false) {
			console.log("Test failed. Expected two empty arrays to be equal.");
		}
		if (fuzzyNumArrayCompare([3], [3]) === false) {
			console.log("Test failed. Expected [3] to be equal to [3].");
		}
		if (fuzzyNumArrayCompare([3.23], [3.225]) === false) {
			console.log("Test failed. Expected [3.23] to be equal to [3.225].");
		}
	}

	function normalCase() {
		var test = x_positionsControl(3, 8, 4);
		if (test[0] !== 3 || test[1] !== 3 + 5/3 || test[2] !== 3 + 10/3 || test[3] !== 8) {
			console.log("Test failed. Expected [3, 4.666666666666667, 6.333333333333334, 8]");
		}
	}

	function errorCase() {
		// test: throws x_positionsControl an error?
		try { 
			x_positionsControl(3, 8, 1);
			console.log("Test failed: Expected thrown error if count < 2");
			// if this line is reached, it means x_positionsControl did not
			// throw an error.
		} catch(err) {}
	}
	testRoundNum();
	testFuzzyNumArrayCompare();

	trivialCase();
	normalCase();
	errorCase();
}

unitTests();
drawRope(x_positions, y_positions, 6);
