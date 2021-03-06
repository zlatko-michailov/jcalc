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
			_jcalc.currSheet.parseUserInput(_jcalc.ui.currentCellRow, _jcalc.ui.currentCellCol, _jcalc.ui.formulaBar.value);
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
		
	for (var r = 0; r <= _jcalc.currSheet.rowCount; r++) {
		var row = this.table.insertRow();
		for (var c = 0; c <= _jcalc.currSheet.colCount; c++) {
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
		
	for (var r = 0; r < _jcalc.currSheet.rowCount; r++) {
		var row = this.table.rows[r + 1];
		for (var c = 0; c < _jcalc.currSheet.colCount; c++) {
			var cell = row.cells[c + 1];
            var val = _jcalc.currSheet.getValue(r, c);
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
	var userInput = _jcalc.currSheet.getUserInput(row, col);
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
    var trIndex = table.rows.length - 1;

    var td1 = tr.insertCell();
    td1.innerHTML = "&nbsp;";
    td1.className = "index";
    var a = document.createElement("a");
    a.id = "import_" + trIndex;
    a.href = "javascript: _jcalc.ui.removeLib('"+ a.id + "');";
    var img = document.createElement("img");
    img.className = "icon";
    img.src = "img/remove16.png";
    a.appendChild(img);
    td1.appendChild(a);
    
    var td2 = tr.insertCell();
    td2.innerHTML = path;
    td2.className = "formula";
    
    _jcalc.imports.push(path);

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = path;
    var head = document.getElementsByTagName("head")[0];    
    head.appendChild(script);
}

JCalc.prototype.UI.prototype.removeLib = function(aId) {
    "use strict"

    var a = document.getElementById(aId);
    var tr = a.parentNode.parentNode;
    var table = tr.parentNode;
    _jcalc.imports.splice(tr.rowIndex, 1);
    table.deleteRow(tr.rowIndex);
}

JCalc.prototype.UI.prototype.saveAsJSON = function() {
    "use strict"

    var uri = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(_jcalc));
    var a = document.getElementById("downloadAsJsonContainer");
    a.setAttribute("href", uri);
    a.setAttribute("download", "Sheet.json");
    a.click();
};

JCalc.prototype.UI.prototype.loadFromJSON = function(filePath) {
	"use strict"

	var reader = new window.FileReader();
	reader.onload = function (e) {
		_jcalc.loadFromJSON(e.target.result);
		_jcalc.ui.populateTable();
	};
	reader.readAsText(filePath.files[0]);
}

_jcalc.ui = new _jcalc.UI();
