let logEntries = [];  // Array to store log entries
let currentPage = 0;  // Current page index
const entriesPerPage = 20;  // Number of entries per page
const maxButtons = 5; // Maximum number of pagination buttons to show

function handleFileSelect(event) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
        const logData = e.target.result;
        logEntries = logData.split('\n');
        displayLogData();
        updatePaginationButtons();
    };
    reader.readAsText(file);
}

function displayLogData() {
    const logList = document.getElementById('log-list');
    logList.innerHTML = '';

    const startIndex = currentPage * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;

    for (let i = startIndex; i < endIndex && i < logEntries.length; i++) {
        const entry = logEntries[i];
        const li = document.createElement('li');
        li.textContent = (i + 1) + ': ' + entry;  // Adding line number
        logList.appendChild(li);
    }
}


function updatePageNumber() {
    const input = document.getElementById('page-number');
    input.value = currentPage + 1;
}

function getTotalPages() {
    return Math.ceil(logEntries.length / entriesPerPage);
}

function updatePaginationButtons() {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    const totalPages = getTotalPages();
    const maxButtons = Math.min(totalPages, 5); // Maximum number of pagination buttons to show

    let startButton = currentPage - Math.floor(maxButtons / 2);
    if (startButton < 0) {
        startButton = 0;
    } else if (startButton > totalPages - maxButtons) {
        startButton = totalPages - maxButtons;
    }

    for (let i = startButton; i < startButton + maxButtons; i++) {
        const button = document.createElement('button');
        button.textContent = i + 1;
        if (i === currentPage) {
            button.disabled = true;
        } else {
            button.addEventListener('click', () => {
                currentPage = i;
                displayLogData();
                updatePageNumber();
                updatePaginationButtons();
            });
        }
        pagination.appendChild(button);
    }
}

function reset() {
    logEntries = [];
    currentPage = 0;
    document.getElementById('log-file').value = '';
    document.getElementById('search').value = '';
    document.getElementById('log-list').innerHTML = '';
    document.querySelector('.pagination').innerHTML = ''; // Clear pagination buttons
    updatePaginationButtons();
}