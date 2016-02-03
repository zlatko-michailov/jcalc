function value(row, col) {
    return sheet.getValue(row, col);
}

function range(row1, col1, row2, col2, callback) {
    "use strict"
    
    var r1 = Math.min(row1, row2);
    var r2 = Math.max(row1, row2);
    var c1 = Math.min(col1, col2);
    var c2 = Math.max(col1, col2);
    
    for (var r = r1; r <= r2; r++) {
        for (var c = c1; c <= c2; c++) {
            callback(value(r,c));
        }
    }
}

function count(row1, col1, row2, col2) {
    var currCount = 0;
    range(row1, col1, row2, col2, function(v) {
       if (v != null) {
           currCount++;
       } 
    });
    
    return currCount;
}

function sum(row1, col1, row2, col2) {
    var currSum = 0;
    range(row1, col1, row2, col2, function(v) {
       if (v != null && typeof v == "number") {
           currSum += v;
       } 
    });
    
    return currSum;
}

function avg(row1, col1, row2, col2) {
    var currSum = 0;
    var currCount = 0;
    range(row1, col1, row2, col2, function(v) {
       if (v != null && typeof v == "number") {
           currSum += v;
           currCount++;
       } 
    });
    
    return currCount != 0 ? currSum / currCount : null;
}

function min(row1, col1, row2, col2) {
    var currMin = null;
    range(row1, col1, row2, col2, function(v) {
       if (v != null && typeof v == "number") {
           if (currMin == null || v < currMin)
           currMin = v;
       } 
    });
    
    return currMin;
}

function max(row1, col1, row2, col2) {
    var currMax = null;
    range(row1, col1, row2, col2, function(v) {
       if (v != null && typeof v == "number") {
           if (currMax == null || currMax < v)
           currMax = v;
       } 
    });
    
    return currMax;
}

