function value(row, col) {
    return _jcalc.currSheet.getValue(row, col);
}

function cell(row, col) {
	return _jcalc.currSheet.ensureCell(row, col);
}

function iterRange(row1, col1, row2, col2, callback) {
    "use strict"

    var r1 = Math.min(row1, row2);
    var r2 = Math.max(row1, row2);
    var c1 = Math.min(col1, col2);
    var c2 = Math.max(col1, col2);

    for (var r = r1; r <= r2; r++) {
        for (var c = c1; c <= c2; c++) {
            callback(r, c);
        }
    }

	return "#SEF!";
}

function fillRange(row1, col1, row2, col2, callback) {
	return iterRange(row1, col1, row2, col2, function(r,c) {
		cell(r,c).value = callback(r,c);
	});
}

function clearRange(row1, col1, row2, col2) {
	return fillRange(row1, col1, row2, col2, function(r, c) {
		cell(r, c).reset();
	});
}

function count(row1, col1, row2, col2) {
    var currCount = 0;
    iterRange(row1, col1, row2, col2, function(r,c) {
       if (value(r,c) != null) {
           currCount++;
       } 
    });
    
    return currCount;
}

function sum(row1, col1, row2, col2) {
    var currSum = 0;
    iterRange(row1, col1, row2, col2, function(r, c) {
	   var v = value(r,c);
       if (v != null && typeof v == "number") {
           currSum += v;
       } 
    });
    
    return currSum;
}

function avg(row1, col1, row2, col2) {
    var currSum = 0;
    var currCount = 0;
    iterRange(row1, col1, row2, col2, function(r, c) {
	   var v = value(r,c);
       if (v != null && typeof v == "number") {
           currSum += v;
           currCount++;
       } 
    });
    
    return currCount != 0 ? currSum / currCount : null;
}

function min(row1, col1, row2, col2) {
    var currMin = null;
    iterRange(row1, col1, row2, col2, function(r, c) {
	   var v = value(r,c);
       if (v != null && typeof v == "number") {
           if (currMin == null || v < currMin)
           currMin = v;
       } 
    });
    
    return currMin;
}

function max(row1, col1, row2, col2) {
    var currMax = null;
    iterRange(row1, col1, row2, col2, function(r, c) {
	   var c = value(r,c);
       if (v != null && typeof v == "number") {
           if (currMax == null || currMax < v)
           currMax = v;
       } 
    });
    
    return currMax;
}

