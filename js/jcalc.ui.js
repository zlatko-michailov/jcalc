function CellOnClick(table, row, col) {
    "use strict"
		
	return function(e) {
        "use strict"
		
		var userText = window.prompt('enter value', '');
		sheet.parseUserInput(row, col, userText);
		populateTable(table);
	}
}

/*
function CellKeyListener(table, row, col) {
	return function(e) {
		var code = e.keyCode ? e.keyCode : e.which;
		var cell = table.rows[row].cells[col];
		
		if (code === 13) { // ENTER
			var regex = new RegExp('<br>', 'g');
			sheet.parseUserInput(row, col, cell.innerHTML.replace(regex, ""));
			afterRecalc(table);
			table.rows[row + 1].cells[col].focus();
			e.stopPropagation();
		}
		
		// Arrow keys
		switch (code) {
		case 37: // LEFT
			table.rows[row].cells[col - 1].focus();
			break;
		case 38: // UP
			table.rows[row - 1].cells[col].focus();
			break;
		case 39: // RIGHT
			table.rows[row].cells[col + 1].focus();
			break;
		case 40: // DOWN
			table.rows[row + 1].cells[col].focus();
			break;
		}
	}
}
*/

function populateTable(table) {
    "use strict"
		
	for (var i = 0; i < sheet.rowCount; i++) {
		var row = table.rows[i + 1];
		for (var j = 0; j < sheet.colCount; j++) {
			var cell = row.cells[j + 1];
            var val = sheet.value(i, j);
            if (val != null) {
                cell.innerHTML = val; 
            }
        }
	}
}

// Redraws the table of the given id with cells
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
				cell.onclick = CellOnClick(table, i - 1, j - 1);
				//cell.setAttribute('contenteditable', 'true');
				//cell.onkeypress = CellKeyListener(table, i, j);
			}
		}
	}
}

function editCell() {
	window.alert('edit cell');
}

function startApp(tableId) {
    "use strict"
		
	var table = document.getElementById(tableId)
	table.style.width = '300%';
    document.body.appendChild(table);
    
    drawTable(table);
    
    ResizableColumns();
}
