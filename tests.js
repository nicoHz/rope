
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
		var test_positions = fence(3,8,2);
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
		var test_positions = roundNum(fence(3,8,4));
		var shouldBeResult = [3,4.67,6.33,8];
		if (arrayCompare(test_positions, shouldBeResult) !== true) {
			console.log("Test failed. Expected fence to return roughly: " + shouldBeResult);
		}
	}

	function errorCase() {
		try { 
			fence(3,8,1);
			console.log("Test failed: Expected thrown error if count < 2");
			// if this line is reached, it means fence did not
			// throw an error.
		} catch(err) {}
	}

	function testTolerantArrayCompare(){
		if (tolerantArrayCompare([1,3,6],[1,3,6], 0.1) !== true) {
			console.log("Test failed. tolerantArrayCompare() should return true, because arrays are equal.");
		}
		if (tolerantArrayCompare([1,3,5],[1,3,6], 0.1) !== false) {
			console.log("Test failed. tolerantArrayCompare() should return false, because arrays are different and tolerance is exceeded.");
		}
		if (tolerantArrayCompare([2.1,3,5],[2,3,5], 0.2) !== true) {
			console.log("Test failed. tolerantArrayCompare() should return true, because arrays are different but  tolerance is not exceeded.");
		}
	}

	testRoundNum();
	testFuzzyNumArrayCompare();

	testArrayCompare();
	trivialCase();
	normalCase();
	errorCase();
	testTolerantArrayCompare();
}
