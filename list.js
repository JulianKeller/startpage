/*
regex, probably needs '$' added to the start of it
 const regex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{2})?)$/;
  if (regex.test(userInput)) {
    return ;
  }
 */

// Add editable row and 2 columns to table
function addRow() {
  const table = document.getElementById("myTable");
  const row = table.insertRow(-1);    // add rows to the end of the table
  const item = row.insertCell(0);
  const price = row.insertCell(1);

  // default cell descriptions
  // item.innerHTML = "Item";
  // price.innerHTML = "$";

  // Make new rows editable
  item.setAttribute('contenteditable', 'true');
  item.setAttribute('oninput', 'saveList()');
  price.setAttribute('oninput', 'saveList()');
  price.setAttribute('contenteditable', 'true');
  price.setAttribute('oninput', 'sumColumn()');
}

// Calculate the total of the price column
function sumColumn() {
  let sum = 0;
  let value = 0;
  const table = document.getElementById("myTable");
  for (let i = 1; i < table.rows.length; i++) {

    if (!table.rows[i].cells[1] || isNaN(value)) {    // if no input in cell
      continue;
    }

    if (table.rows[i].cells[1].innerHTML[0] === '$') {
      value = parseFloat(table.rows[i].cells[1].innerHTML.substring(1));
    } else {
      value = parseFloat(table.rows[i].cells[1].innerHTML);   // check for empty prices
    }
    if (isNaN(value)) {
      value = 0;
    }
    sum += value;
  }
  sum = Math.round(sum * 100) / 100;    // proper formatting
  document.getElementById('total').innerHTML = 'Total $' + sum.toFixed(2); // display the total on the page
  saveList();     // save the list to local storage
  return sum;
}

// Save table values in localstorage
function saveList() {
  // check browser support
  if (typeof (Storage) === "undefined") {
    return;
  }
  const table = document.getElementById("myTable");

  let tableArray = [];

  // store table
  for (let i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[0] == null) {
      continue;
    }

    tableArray[i] = new Array(2);

    tableArray[i][0] = table.rows[i].cells[0].innerHTML;

    let price = parseFloat(table.rows[i].cells[1].innerHTML);
    price = Math.round(price * 100) / 100;
    tableArray[i][1] = price.toFixed(2);    // .toFixed ensures 2 decimal places
  }
  localStorage.setItem('table', JSON.stringify(tableArray));
}



// get table values from localstorage
function getTable() {
  // check browser support
  if (typeof (Storage) === "undefined") {
    return;
  }
  const table = document.getElementById("myTable");

  let storageList = JSON.parse(localStorage.getItem('table'));

  // check for empty list
  if (!storageList) {
    console.log("Empty List");
    return;
  }

  // if item already exists, don't load it again
  for (let i = 1; i < table.rows.length; i++) {
    document.getElementById('myTable').deleteRow(i);
  }

  // restore table
  for (let i = 1; i < storageList.length; i++) {
    if (storageList[i] == null) {
      continue;
    }
    const row = table.insertRow(-1);    // add rows to the end of the table
    const item = row.insertCell(0);
    const price = row.insertCell(1);
    // default cell descriptions
    item.innerHTML = storageList[i][0];
    price.innerHTML = storageList[i][1];

    // if (item.innerHTML && price.innerHTML) {
    //   console.log('item.innerHTML && price.innerHTML', item.innerHTML, price.innerHTML);
    //   console.log('blank row ', i);
    // }

    // leave blank instead of outputting 'NaN'
    if (isNaN(parseInt(price.innerHTML))) {
      price.innerHTML = '';
    }

    // Make new rows editable
    item.setAttribute('contenteditable', 'true');
    item.setAttribute('oninput', 'saveList()');

    price.setAttribute('oninput', 'saveList()');
    price.setAttribute('contenteditable', 'true');
    price.setAttribute('oninput', 'sumColumn()');
  }
}

// empty list
function emptyList() {
  let theme = document.getElementById("pageStyle").getAttribute("href"); // save the users theme
  localStorage.clear(); // empty local storage
  location.reload(); // reload the page
  changeTheme(theme);
}


// allow the user to change theme
function changeTheme(sheet) {
  document.getElementById("pageStyle").setAttribute("href", sheet);
  saveTheme();
}


// save the users chosen theme
function saveTheme() {
  if (typeof (Storage) === "undefined") {
    return;
  }
  let theme = document.getElementById("pageStyle").getAttribute("href");
  // console.log(theme);
  localStorage.setItem('theme', JSON.stringify(theme));
}


// load the users theme
function loadTheme() {
  let theme = JSON.parse(localStorage.getItem('theme'));
  if (theme == null){
    theme = 'style.css';
  }
  changeTheme(theme);
  // console.log(theme);
}


// run on page load
window.onload = function () {
  loadTheme();    // load the users theme
  // check for empty list
  let storageList = JSON.parse(localStorage.getItem('table'));
  if (!storageList) {
    // console.log("Empty List");
    addRow();
  } else {
    getTable();
    sumColumn();
  }
};

