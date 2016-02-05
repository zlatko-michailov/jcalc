function factors(n) {
	"use strict"
	
	var result = [];
	for (var i = 2; i <= n; i++) {
		while (n % i == 0) {
			result.push(i);
			n /= i;
		}
	}
	return result;
}

function collatz(n) {
	"use strict"
	
	var result = [n];
	while (n > 1) {
		n = (n % 2 == 0) ? n / 2 : n * 3 + 1;
		result.push(n);
	}
	return result;
}

function writeVector(r, c, vector, horiz) {
	"use strict"
	
	var r2 = horiz ? r : r + vector.length - 1;
	var c2 = horiz ? c + vector.length - 1 : c;
	var i = 0;
	return fillRange(r, c, r2, c2, function(r,c) {
		return vector[i++];
	});
}
