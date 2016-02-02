function fillTable(id, rows, cols) {
	var body = document.body;
	var table = document.getElementById(id);
	table.style.width = '300%';
	//table.style.border = '1px solid black';
	
	for (var i = 0; i <= rows; i++) {
		var row = table.insertRow();
		for (var j = 0; j <= cols; j++) {
			var cell = row.insertCell();
			if (i == 0 && j == 0)
				cell.style.backgroundColor = 'black';
			else if (i == 0) {
				cell.style.backgroundColor = 'LightGray';
				cell.innerHTML = '' + j;
			} else if (j == 0) {
				cell.style.backgroundColor = 'LightGray';
				cell.innerHTML = '' + i;
			}
			cell.style.border = '1px solid gray';
		}
	}
	
	body.appendChild(table);
}