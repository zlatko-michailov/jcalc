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

    this.rowCount = 100;
    this.colCount = 50;
    this.currCalcRun = 0;
    this.imports = [];
    
    // Initialize the rows and coilumns but not each cell. 
    this.cells = new Array(this.rowCount);
    for (var i = 0; i < this.rowCount; i++) {
        this.cells[i] = new Array(this.colCount);
    }
	
	this.isNull = function(x) {
		return (x == null || typeof x == 'undefined');
	}
	
	this.saveAsJson = function() {
		var uri = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this));
		var a = document.getElementById("downloadAsJsonContainer");
		a.setAttribute("href", uri);
		a.setAttribute("download", "Sheet.json");
		a.click();
	}
	
    this.error = function(res, msg) {
        alert(msg);
        return res;
    }
    
    this.getCell = function(row, col) {
        "use strict"
    
        var cell = this.cells[row][col];
        return !this.isNull(cell) ? cell : null;
    }
	
	this.ensureCell = function(row, col) {
		var cell = this.cells[row][col];
		if (this.isNull(cell)) {
			cell = new Cell();
			this.cells[row][col] = cell;
		}
		return cell;
	}
    
    this.getValue = function(row, col) {
        "use strict"
    
        var cell = this.getCell(row, col);
        if (cell == null) {
            return null;
        }
        
        if (cell.underCalc) {
            return this.error("#REF!", "Circular reference detected!");
        }
        
        if (cell.valueCalcRun < this.currCalcRun && !this.isNull(cell.formula)) {
            cell.underCalc = true;
            cell.valueCalcRun = this.currCalcRun;
			try {
				cell.value = cell.formula();
			} catch (err) {
				cell.value = this.error("#NAME?", "Invalid formula: '" + cell.userInput + "' - " + err);
			} finally {
				cell.underCalc = false;
			}
        }
        
        return cell.value;
    }
	
	this.getUserInput = function(row, col) {
		var cell = this.getCell(row, col);
		return cell != null ? cell.userInput : null;
	}
    
    this.recalc = function() {
        "use strict"
    
        // Increment the current calc run.
        this.currCalcRun++;
        
        for (var row = 0; row < this.rowCount; row++) {
            for (var col = 0; col < this.colCount; col++) {
                this.getValue(row, col); // causes recalc
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
    }
}

var sheet = new Sheet();
