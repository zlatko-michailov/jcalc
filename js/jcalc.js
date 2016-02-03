// Cell ctor
function Cell() {
    "use strict"
    
    this.reset = function() {
        this.userInput = null;
        this.value = null;
        this.formula = null;
        this.valueCalcRun = 0;
        this.underCalc = false;
    }
    
    this.reset();
}

// Sheet ctor
function Sheet() {
    "use strict"

    this.rowCount = 50;
    this.colCount = 100
    this.currCalcRun = 0;
    
    // Initialize the rows and coilumns but not each cell. 
    this.cells = new Array(this.rowCount);
    for (var i = 0; i < this.rowCount; i++) {
        this.cells[i] = new Array(this.colCount);
    }
	
	this.isNull = function(x) {
		return (x == null || typeof x == 'undefined');
	}
	
    this.error = function(res, msg) {
        alert(msg);
        return res;
    }
    
    this.value = function(row, col) {
        "use strict"
    
        var cell = this.cells[row][col];
        if (this.isNull(cell)) {
            return '';
        }
        
        if (cell.underCalc) {
            return this.error("#REF!", "Circular reference detected!");
        }
        
        if (cell.valueCalcRun < this.currCalcRun && !this.isNull(cell.formula)) {
            cell.underCalc = true;
            cell.valueCalcRun = this.currCalcRun;
            cell.value = cell.formula();
            cell.underCalcRun = false;
        }
        
        return cell.value;
    }
    
    this.recalc = function() {
        "use strict"
    
        // Increment the current calc run.
        this.currCalcRun++;
        
        for (var row = 0; row < this.rowCount; row++) {
            for (var col = 0; col < this.colCount; col++) {
                var cell = this.cells[row][col]; 
                if (!this.isNull(cell) && !this.isNull(cell.formula) {
                    cell.value = cell.formula();
                }
            }
        }
    }
    
    this.parseUserInput = function(row, col, userInput) {
        "use strict"
		
        // Ensure the cell is initialized/reset.
        var cell = this.cells[row][col];
        if (this.isNull(cell)) {
            this.cells[row][col] = new Cell();
            cell = this.cells[row][col];
        }
        else {
            cell.reset();
        }
        
        cell.userInput = userInput;
        
        if (typeof userInput == "string") {
            userInput = userInput.trim();
            if (userInput.charAt(0) == "=") {
                cell.formula = new Function("return " + userInput.substring(1));
            }
        }
        
        // If the input wasn't a formula, it must be a value. 
        if (this.isNull(cell.formula)) {
            cell.value = userInput;
        }
        
        // Recalc the sheet whenever a cell changes.
        this.recalc();
    }
}

var sheet = new Sheet();

// Shortcut
function val(r, c) {
    return sheet.value(r, c);
}
