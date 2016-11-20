
function drawRope(horizontalPositions, verticalPositions, radius, colorFill, colorStroke){
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
		ctx.fillStyle = colorFill;

		if (i !== 0) {
			ctx.moveTo(x, y); 
			ctx.lineTo(oldx, oldy); 
			/* das objekt ctx hat die eigenschaft lineTo,
			die eine funktion ist. die funktion lineTo wird 
			mir zwei parametern aufgerufen: werte oldx, oldy 
			*/
			ctx.strokeStyle = colorStroke; 
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

function calcXpositions(start, end, count) {
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


// *****************************************************************************************
function unitTests() {

	function testArrayCompare() {
		if (arrayCompare([2,3,4],[2]) !== false) {
			console.log("Test failed. arrayCompare() should return false, when parameters don't have the same length.");
		}
		if (arrayCompare([],[]) !== true) {
			console.log("Test failed. arrayCompare() should return truee, when comparing two empty arrays.");
		}
		if (arrayCompare([2,3,4],[2,3,5]) !== false) {
			console.log("Test failed. arrayCompare() should return false, when parameters don't have the same elements.");
		}
		if (arrayCompare([2,3,4],[2,3,4]) !== true) {
			console.log("Test failed. arrayCompare() should return true, when parameters are equal.");
		}
	}
	
	function trivialCase() {
		var test_positions = calcXpositions(3,8,2);
		if (arrayCompare(test_positions, [3,8]) !== true) {
			console.log("Test failed. Expected result to be [3,8]");
		}
	}

	function roundNum(numbers) {
		var roundedNum = [];
		for (i=0; i < numbers.length; i++) {
			var x = Math.round(numbers[i]*100)/100;
			roundedNum.push(x);
		}
		console.log("rounded values of x: " + roundedNum);
		return roundedNum;
	}

	function testRoundNum() {
		var numbers = roundNum([3, 8.25, 4.5555]);
		var expectNum = "3,8.25,4.56";
		if (numbers + "" !== expectNum) {
			console.log("Test failed. Expected " + expectNum);
		}
		var emptyArray = roundNum([]);
		if (emptyArray.length !== 0) {
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
		var test_positions = roundNum(calcXpositions(3,8,4));
		var shouldBeResult = [3,4.67,6.33,8];
		if (arrayCompare(test_positions, shouldBeResult) !== true) {
			console.log("Test failed. Expected calcXpositions to return roughly: " + shouldBeResult);
		}
	}

	function errorCase() {
		try { 
			calcXpositions(3,8,1);
			console.log("Test failed: Expected thrown error if count < 2");
			// if this line is reached, it means calcXpositions did not
			// throw an error.
		} catch(err) {}
	}

	testRoundNum();
	testFuzzyNumArrayCompare();

	testArrayCompare();
	trivialCase();
	normalCase();
	errorCase();
}

unitTests();

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x_positions = calcXpositions(20,890,50);
/* Übergabe des Array x_position an function sinusShape
und zuweisung des return-wertes von sinusShape an y_positions.
*/
function drawFrame(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var y_positions = sinusShape(x_positions, Date.now()/1000); // Date.now gibt ms aus, daher Umrechnung von ms in s
	function drawRopes(number) {

		for (var i = 1; i<= number; i++) {
			drawRope(x_positions, y_positions, 6, "#FF0000", "#FF0000");
			console.log("number of sineWave:" + i);
		}
	}
	drawRopes(10);

//	y_positions = sinusShape(x_positions, Date.now()*2/1000 + 3.14); 
//	drawRope(x_positions, y_positions, 6, "#296AE3", "#296AE3");
	
//	y_positions = sinusShape(x_positions, Date.now()/1000 + 0.01); 
//	drawRope(x_positions, y_positions, 6);
}

setInterval(drawFrame, 20);

