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
	
	for (var i = 0; i < vector.length; i++) {
		if (horiz) cell(r, c + i).value = vector[i];
		else cell(r + i, c).value = vector[i];
	}
}
