const apiUrl = 'http://localhost:3000';
const monthSelect = document.getElementById('month');
const searchInput = document.getElementById('search');
const transactionsTable = document.getElementById('transactions');
const transactionsBody = document.getElementById('transactions-body');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const totalAmountSpan = document.getElementById('total-amount');
const totalSoldSpan = document.getElementById('total-sold');
const totalNotSoldSpan = document.getElementById('total-not-sold');
const barChartCanvas = document.getElementById('bar-chart');
let currentPage = 1;
let selectedMonth = monthSelect.value;

// Function to fetch transactions data
async function fetchTransactions(month, searchQuery, page) {
  const response = await fetch(`${apiUrl}/transactions?month=${month}&search=${searchQuery}&page=${page}`);
  const data = await response.json();
  return data;
}

// Function to update transactions table
function updateTransactionsTable(transactions) {
  transactionsBody.innerHTML = '';
  transactions.forEach((transaction) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.title}</td>
      <td>${transaction.description}</td>
      <td>${transaction.price}</td>
    `;
    transactionsBody.appendChild(row);
  });
}

// Function to update transactions statistics
async function updateTransactionsStatistics(month) {
  const response = await fetch(`${apiUrl}/transactions/statistics?month=${month}`);
  const data = await response.json();
  totalAmountSpan.textContent = data.totalAmount;
  totalSoldSpan.textContent = data.totalSold;
  totalNotSoldSpan.textContent = data.totalNotSold;
}

// Function to update transactions bar chart
async function updateTransactionsBarChart(month) {
  const response = await fetch(`${apiUrl}/transactions/bar-chart?month=${month}`);
  const data = await response.json();
  // Update the bar chart using the data
  // ( implementation of the bar chart library is omitted for brevity )
}

// Event listeners
monthSelect.addEventListener('change', async () => {
  selectedMonth = monthSelect.value;
  await updateTransactionsTable(await fetchTransactions(selectedMonth, '', 1));
  await updateTransactionsStatistics(selectedMonth);
  await updateTransactionsBarChart(selectedMonth);
});

searchInput.addEventListener('input', async () => {
  const searchQuery = searchInput.value;
  await updateTransactionsTable(await fetchTransactions(selectedMonth, searchQuery, 1));
});

prevButton.addEventListener('click', async () => {
  currentPage -= 1;
  await updateTransactionsTable(await fetchTransactions(selectedMonth, '', currentPage));
});

nextButton.addEventListener('click', async () => {
  currentPage += 1;
  await updateTransactionsTable(await fetchTransactions(selectedMonth, '', currentPage));
});

// Initial data load
updateTransactionsTable(await fetchTransactions(selectedMonth, '', 1));
updateTransactionsStatistics(selectedMonth);
updateTransactionsBarChart(selectedMonth);