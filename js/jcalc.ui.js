function CellKeyListener(table, row, col) {
	return function(e) {
		var cellText = table.rows[row].cells[col].innerHTML;
		if (cellText != '<br>')
			return; // cell contains text
		var code = e.keyCode ? e.keyCode : e.which;
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
		case 13: // ENTER
		case 40: // DOWN
			table.rows[row + 1].cells[col].focus();
			break;
		}
	}
}

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
				cell.innerHTML = j;
			} else if (j == 0) {
				setHeaderCellStyle(cell);
				cell.innerHTML = i;
			} else {
				cell.style.border = '1px solid LightGray';
				cell.setAttribute('contenteditable', 'true');
				cell.onkeypress = CellKeyListener(table, i, j);
			}
		}
	}
	
	body.appendChild(table);
}

function editCell() {
	window.alert('edit cell');
}