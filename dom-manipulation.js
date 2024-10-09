// dom-manipulation.js

let selectedColumns = [];
let allColumns = [];
const coreColumns = ['ID', 'Name']; // Define core columns here

function updateTable(data) {
  const table = document.getElementById('dataTable');
  table.innerHTML = '';

  if (data.length === 0) return;

  const header = table.createTHead();
  const headerRow = header.insertRow();
  const columns = [...coreColumns, ...selectedColumns.filter(col => !coreColumns.includes(col))];

  columns.forEach((column) => {
    const th = document.createElement('th');
    th.textContent = column;
    headerRow.appendChild(th);
  });

  const body = table.createTBody();
  for (let i = 1; i < data.length; i++) {
    const row = body.insertRow();
    columns.forEach((column) => {
      const cell = row.insertCell();
      cell.textContent = data[i][allColumns.indexOf(column)];
    });
  }
}

function updateColumnSelector(headers) {
  const columnSelector = document.getElementById('columnSelector');
  columnSelector.innerHTML = '';

  allColumns = headers;
  selectedColumns = [...coreColumns];

  headers.forEach((header, index) => {
    if (!coreColumns.includes(header)) {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `column-${index}`;
      checkbox.value = header;
      checkbox.checked = selectedColumns.includes(header);
      checkbox.addEventListener('change', handleColumnSelection);

      const label = document.createElement('label');
      label.htmlFor = `column-${index}`;
      label.textContent = header;

      columnSelector.appendChild(checkbox);
      columnSelector.appendChild(label);
      columnSelector.appendChild(document.createElement('br'));
    }
  });
}

function handleColumnSelection(event) {
  const column = event.target.value;
  if (event.target.checked) {
    if (!selectedColumns.includes(column)) {
      selectedColumns.push(column);
    }
  } else {
    const index = selectedColumns.indexOf(column);
    if (index > -1) {
      selectedColumns.splice(index, 1);
    }
  }
  updateTable(window.currentData); // Use the current data to update the table
}

// Add this function to store the current data globally
function setCurrentData(data) {
  window.currentData = data;
}