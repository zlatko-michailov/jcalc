var currentCellRow = 0;
var currentCellCol = 0;

var formulaBar;
var table;

function selectCell(row, col) {
	"use strict"

	document.getElementById("currentCell").innerHTML = '(' + row + ', ' + col + ')';
	// unselect previous cell
	table.rows[currentCellRow + 1].cells[currentCellCol + 1].className -= " selected";
	currentCellRow = row;
	currentCellCol = col;
	table.rows[row + 1].cells[col + 1].className += " selected";
	var userInput = sheet.getUserInput(row, col);
	formulaBar.value = userInput != null ? userInput : '';
	formulaBar.focus();
	formulaBar.select();
}

function CellOnClick(row, col) {
	return function(e) { selectCell(row, col); }
}

// Populates the given existing table with values.
function populateTable(table) {
    "use strict"
		
	for (var i = 0; i < sheet.rowCount; i++) {
		var row = table.rows[i + 1];
		for (var j = 0; j < sheet.colCount; j++) {
			var cell = row.cells[j + 1];
            var val = sheet.getValue(i, j);
            cell.innerHTML = val != null ? val : ''; 
        }
	}
}

// Initially draws the given table object.
function drawTable(table) {
    "use strict"
		
	for (var i = 0; i <= sheet.rowCount; i++) {
		var row = table.insertRow();
		for (var j = 0; j <= sheet.colCount; j++) {
			var cell = row.insertCell();
			if (i == 0 && j == 0) {
				cell.style.backgroundColor = 'Black';
			} else if (i == 0) {
				cell.className += " header";
				cell.innerHTML = j - 1;
			} else if (j == 0) {
				cell.className += " header";
				cell.innerHTML = i - 1;
			} else {
				cell.onclick = CellOnClick(i - 1, j - 1);
			}
		}
	}
	
	table.rows[1].cells[1].className += " selected";
}

function startApp(tableId, formulaBarId) {
    "use strict"

	// assign globals
	table = document.getElementById(tableId);
	formulaBar = document.getElementById(formulaBarId);

	formulaBar.addEventListener("keydown", function(e) {
		if (e.keyCode == 13) { // ENTER
			sheet.parseUserInput(currentCellRow, currentCellCol, formulaBar.value);
			populateTable(table);
			selectCell(currentCellRow + 1, currentCellCol);
		}
	}, false);

    drawTable(table);
    ResizableColumns();
	formulaBar.focus();
}
