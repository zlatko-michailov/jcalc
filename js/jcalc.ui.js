// Common UI methods
JCalc.prototype.UI = function() {
    "use strict"

    this.currentCellRow = 0;
    this.currentCellCol = 0;
    this.formulaBar = null;
    this.table = null;
};

JCalc.prototype.UI.prototype.startApp = function(tableId, formulaBarId) {
    "use strict"

	// Assign globals
	this.table = document.getElementById(tableId);
	this.formulaBar = document.getElementById(formulaBarId);

	this.formulaBar.addEventListener("keydown", function(e) {
		if (e.keyCode == 13) { // ENTER
			_jcalc.sheet.parseUserInput(_jcalc.ui.currentCellRow, _jcalc.ui.currentCellCol, _jcalc.ui.formulaBar.value);
			_jcalc.ui.populateTable();
			_jcalc.ui.selectCell(_jcalc.ui.currentCellRow + 1, _jcalc.ui.currentCellCol);
		}
	}, false);

    this.drawTable();
    ResizableColumns();
	this.formulaBar.focus();
}


JCalc.prototype.UI.prototype.drawTable = function() {
    "use strict"
		
	for (var r = 0; r <= _jcalc.sheet.rowCount; r++) {
		var row = this.table.insertRow();
		for (var c = 0; c <= _jcalc.sheet.colCount; c++) {
			var cell = row.insertCell();
			if (r == 0 && c == 0) {
				cell.style.backgroundColor = 'Black';
			} else if (r == 0) {
				cell.className += " header";
				cell.innerHTML = c - 1;
			} else if (c == 0) {
				cell.className += " header";
				cell.innerHTML = r - 1;
			} else {
				cell.onclick = this.CellOnClick(r - 1, c - 1);
			}
		}
	}
	
	this.table.rows[1].cells[1].className += " selected";
};

JCalc.prototype.UI.prototype.populateTable = function() {
    "use strict"
		
	for (var r = 0; r < _jcalc.sheet.rowCount; r++) {
		var row = this.table.rows[r + 1];
		for (var c = 0; c < _jcalc.sheet.colCount; c++) {
			var cell = row.cells[c + 1];
            var val = _jcalc.sheet.getValue(r, c);
            cell.innerHTML = val != null ? val : ''; 
        }
	}
};

JCalc.prototype.UI.prototype.CellOnClick = function(row, col) {
	"use strict"

	return function(e) { _jcalc.ui.selectCell(row, col); }
};

JCalc.prototype.UI.prototype.selectCell = function(row, col) {
	"use strict"

	document.getElementById("currentCell").innerHTML = '(' + row + ', ' + col + ')';
	// unselect previous cell
	this.table.rows[this.currentCellRow + 1].cells[this.currentCellCol + 1].className -= " selected";
	this.currentCellRow = row;
	this.currentCellCol = col;
	this.table.rows[row + 1].cells[col + 1].className += " selected";
	var userInput = _jcalc.sheet.getUserInput(row, col);
	this.formulaBar.value = userInput != null ? userInput : '';
	this.formulaBar.focus();
	//formulaBar.select();
};

JCalc.prototype.UI.prototype.importLib = function(tableId) {
    "use strict"

    var path = window.prompt("Enter path to a Javascript file", "");
	if (!path) return;
    
    var table = document.getElementById(tableId);
    var tr = table.insertRow();
    
    var td1 = tr.insertCell();
    td1.innerHTML = "&nbsp;";
    td1.className = "index";
    var btn = document.createElement("button");
    btn.className = "icon";
    btn.innerHTML = "-";
    btn.onclick = function() { _jcalc.ui.removeLib(this); };
    td1.appendChild(btn);
    
    var td2 = tr.insertCell();
    td2.innerHTML = path;
    td2.className = "formula";
    
    _jcalc.sheet.imports.push(path);

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = path;
    var head = document.getElementsByTagName("head")[0];    
    head.appendChild(script);
}

JCalc.prototype.UI.prototype.removeLib = function(btn) {
    "use strict"

    var tr = btn.parentNode.parentNode;
    var table = tr.parentNode;
    _jcalc.sheet.imports.splice(tr.rowIndex, 1);
    table.deleteRow(tr.rowIndex);
}

JCalc.prototype.UI.prototype.saveAsJSON = function() {
    "use strict"

    var uri = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this));
    var a = document.getElementById("downloadAsJsonContainer");
    a.setAttribute("href", uri);
    a.setAttribute("download", "Sheet.json");
    a.click();
};

_jcalc.ui = new _jcalc.UI();

