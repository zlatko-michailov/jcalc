var JCalc = function() {
    this.sheet = new this.Sheet();
};

// Common methods
JCalc.prototype.isNull = function(x) {
    "use strict"

    return (x == null || typeof x == 'undefined');
};

JCalc.prototype.error = function(res, msg) {
    "use strict"

    alert(msg);
    return res;
};

JCalc.prototype.saveAsJSON = function() {
    "use strict"

    var uri = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this));
    var a = document.getElementById("downloadAsJsonContainer");
    a.setAttribute("href", uri);
    a.setAttribute("download", "Sheet.json");
    a.click();
};

// Sheet methods
JCalc.prototype.Sheet = function() {
    "use strict"

    this.rowCount = 100;
    this.colCount = 50;
    this.currCalcRun = 0;
    this.imports = [];
    
    // Initialize the rows and coilumns but not each cell. 
    this.cells = new Array(this.rowCount);
    for (var r = 0; r < this.rowCount; r++) {
        this.cells[r] = new Array(this.colCount);
    }
};

JCalc.prototype.Sheet.prototype.recalc = function() {
    "use strict"

    // Increment the current calc run.
    this.currCalcRun++;
    
    for (var row = 0; row < this.rowCount; row++) {
        for (var col = 0; col < this.colCount; col++) {
            this.getValue(row, col); // causes recalc
        }
    }
};

JCalc.prototype.Sheet.prototype.getCell = function(row, col) {
    "use strict"

    var cell = this.cells[row][col];
    return !_jcalc.isNull(cell) ? cell : null;
};
        
JCalc.prototype.Sheet.prototype.ensureCell = function(row, col) {
    "use strict"

    var cell = this.cells[row][col];
    if (_jcalc.isNull(cell)) {
        cell = new this.Cell();
        this.cells[row][col] = cell;
    }
    
    return cell;
}

JCalc.prototype.Sheet.prototype.getValue = function(row, col) {
    "use strict"

    var cell = this.getCell(row, col);
    if (cell == null) {
        return null;
    }
    
    if (cell.underCalc) {
        return _jcalc.error("#REF!", "Circular reference detected!");
    }
    
    if (cell.valueCalcRun < this.currCalcRun && !_jcalc.isNull(cell.formula)) {
        cell.underCalc = true;
        cell.valueCalcRun = this.currCalcRun;
        try {
            cell.value = cell.formula();
        } catch (err) {
            cell.value = _jcalc.error("#NAME?", "Invalid formula: '" + cell.userInput + "' - " + err);
        } finally {
            cell.underCalc = false;
        }
    }
    
    return cell.value;
}
        
JCalc.prototype.Sheet.prototype.getUserInput = function(row, col) {
    "use strict"

    var cell = this.getCell(row, col);
    return cell != null ? cell.userInput : null;
}
 
JCalc.prototype.Sheet.prototype.parseUserInput = function(row, col, userInput) {
    "use strict"
    
    // Ensure the cell is initialized/reset.
    var cell = this.cells[row][col];
    if (_jcalc.isNull(cell)) {
        this.cells[row][col] = new this.Cell();
        cell = this.cells[row][col];
    }
    else {
        cell.reset();
    }
    
    cell.userInput = userInput;

    // Check if the user input is a formula.        
    userInput = userInput.trim();
    if (userInput.charAt(0) == "=") {
        var formulaBody = userInput.substring(1);
        try {
            cell.formula = new Function("return " + formulaBody);
        }
        catch(err) {
            window.alert("Invalid formula: '" + formulaBody + "' - " + err);
            cell.reset();
        }
    }
    else {
        try {
            // Try to evaluate the input to get the actual type.
            cell.value = eval(userInput);
        }
        catch(err) {
            // If evaluation fails, treat the user input as a string literal. 
            cell.value = userInput;
        }
    }
    
    // Recalc the sheet whenever a cell changes.
    this.recalc();
};

// Cell methods
JCalc.prototype.Sheet.prototype.Cell = function() {
    "use strict"
    
    this.reset();
};

JCalc.prototype.Sheet.prototype.Cell.prototype.reset = function() {
    "use strict"
    
    this.userInput = null;
    this.value = null;
    this.formula = null;
    this.valueCalcRun = 0;
    this.underCalc = false;
};

var _jcalc = new JCalc();
