function redraw(table) {
	for (var i = 0; i < sheet.rowCount; i++) {
		for (var j = 0; j < sheet.colCount; j++) {
			table.rows[i].cells[j].innerHTML = sheet.value(i, j);
		}
	}
}

function CellOnClick(table, row, col) {
	return function(e) {
		var userText = window.prompt('enter value', '');
		sheet.parseUserInput(row, col, userText);
		redraw(table);
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

// Fills the table of the given id with cells
function fillTable(id, rows, cols) {
	var body = document.body;
	var table = document.getElementById(id)
	table.style.width = '300%';
	
	function setHeaderCellStyle(cell) {
		cell.style.backgroundColor = 'LightGray';
		cell.style.border = '1px solid Gray';
	}
	
	for (var i = 0; i <= rows; i++) {
		var row = table.insertRow();
		for (var j = 0; j <= cols; j++) {
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
				cell.onclick = CellOnClick(table, i, j);
				//cell.setAttribute('contenteditable', 'true');
				//cell.onkeypress = CellKeyListener(table, i, j);
			}
		}
	}
	
	body.appendChild(table);
}

function editCell() {
	window.alert('edit cell');
}