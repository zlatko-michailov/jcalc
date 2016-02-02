// Fills the table of the given id with cells
function fillTable(id, rows, cols) {
	var body = document.body;
	var table = document.getElementById(id);
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
				cell.setAttribute('onClick', 'editCell();');
			}
		}
	}
	
	body.appendChild(table);
}

function editCell() {
	window.alert('edit cell');
}