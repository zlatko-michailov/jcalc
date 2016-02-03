var currentCellRow = 0;
var currentCellCol = 0;

var formulaBar;

function CellOnClick(cell, row, col) {
    "use strict"

	return function(e) {
        "use strict"
		
		cell.className += " selected";
		currentCellRow = row;
		currentCellCol = col;
        
        var userInput = sheet.getUserInput(row, col);
		formulaBar.value = userInput != null ? userInput : ''; 
		formulaBar.focus();
	}
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
		
	function setHeaderCellStyle(cell) {
		cell.style.backgroundColor = 'LightGray';
		cell.style.border = '1px solid Gray';
	}
	
	for (var i = 0; i <= sheet.rowCount; i++) {
		var row = table.insertRow();
		for (var j = 0; j <= sheet.colCount; j++) {
			var cell = row.insertCell();
			if (i == 0 && j == 0) {
				cell.style.backgroundColor = 'Black';
			} else if (i == 0) {
				setHeaderCellStyle(cell);
				cell.innerHTML = j - 1;
			} else if (j == 0) {
				setHeaderCellStyle(cell);
				cell.innerHTML = i - 1;
			} else {
				cell.style.border = '1px solid LightGray';
				cell.onclick = CellOnClick(cell, i - 1, j - 1);
			}
		}
	}
}

function editCell() {
	window.alert('edit cell');
}

function startApp(tableId, formulaBarId) {
    "use strict"

	var table = document.getElementById(tableId);
	table.style.width = '300%';
    document.body.appendChild(table);

	formulaBar = document.getElementById(formulaBarId);

	formulaBar.addEventListener("keydown", function(e) {
		if (e.keyCode == 13) { // ENTER
			sheet.parseUserInput(currentCellRow, currentCellCol, formulaBar.value);
			populateTable(table);
		}
	}, false);

    drawTable(table);
    ResizableColumns();
}
