function fillTable(id, rows, cols) {
	var body = document.body;
	var table = document.getElementById(id);
	table.style.width = '100px';
	table.style.border = '1px solid black';
	
	for (var i = 0; i < rows; i++) {
		var tr = table.insertRow();
		for (var j = 0; j < cols; j++) {
			var td = tr.insertCell();
			td.appendChild(document.createTextNode('hello'));
			td.style.border = '1px solid gray';
		}
	}
	
	body.appendChild(table);
}

// Creates a new default cell
function Cell() {
	this.value = null;
	this.formula = function() { return null; };
	this.recalc = 0;
	this.inProress = false;
}
