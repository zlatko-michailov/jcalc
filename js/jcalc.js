// Cell ctor
function Cell() {
    "use strict"
    
	this.value = null;
	this.formula = null;
	this.valueCalcRun = 0;
	this.underCalc = false;
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
    
    this.error = function(res, msg) {
        alert(msg);
        return res;
    }
    
    this.value = function(r, c) {
        "use strict"
    
        var cell = this.cells[r][c];
        if (cell == null) return null;
        if (cell.underCalc) return this.error("#REF!", "Circular reference detected!");
        if (cell.valueCalcRun < this.currCalcRun && cell.formula != null) {
            cell.underCalc = true;
            cell.valueCalcRun = this.currCalcRun;
            cell.value = cell.formula();
            cell.underCalRun = false;
        }
        
        return cell.value;
    }
}

var sheet = new Sheet();

