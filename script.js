const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';

// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to render the cryptocurrency data in grid view
function renderGridView(cryptoData) {
    const cryptoContainer = document.getElementById('cryptoContainer');
    cryptoContainer.innerHTML = '';
    cryptoContainer.classList.add('grid-view');

    cryptoData.forEach(crypto => {
        const card = createCard(crypto);
        cryptoContainer.appendChild(card);
    });
}

// Function to render the cryptocurrency data in list view
function renderListView(cryptoData) {
    const cryptoContainer = document.getElementById('cryptoContainer');
    cryptoContainer.innerHTML = '';
    cryptoContainer.classList.remove('grid-view');

    const table = document.createElement('table');
    table.classList.add('list-view');

    // Create table header
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Price (USD)</th>
            <th>Market Cap</th>
            <th>24h Change</th>
            <th>Total Volume</th>
        </tr>
    `;
    table.appendChild(tableHeader);

    // Create table rows
    const tableBody = document.createElement('tbody');
    cryptoData.forEach(crypto => {
        const row = createRow(crypto);
        tableBody.appendChild(row);
    });
    table.appendChild(tableBody);

    cryptoContainer.appendChild(table);
}

// Helper function to create individual cryptocurrency cards (grid view)
function createCard(crypto) {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = crypto.image;
    card.appendChild(image);

    const name = document.createElement('h3');
    name.textContent = crypto.name;
    card.appendChild(name);

    const price = document.createElement('p');
    price.textContent = `Price: $${crypto.current_price.toFixed(2)}`;
    card.appendChild(price);

    const marketCap = document.createElement('p');
    marketCap.textContent = `Market Cap: $${crypto.market_cap.toLocaleString()}`;
    card.appendChild(marketCap);

    const priceChange = document.createElement('p');
    priceChange.textContent = `24h Change: ${crypto.price_change_percentage_24h.toFixed(2)}%`;
    card.appendChild(priceChange);

    const volume = document.createElement('p');
    volume.textContent = `Total Volume: $${crypto.total_volume.toLocaleString()}`;
    card.appendChild(volume);

    return card;
}

// Helper function to create individual rows (list view)
function createRow(crypto) {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = crypto.name;
    row.appendChild(nameCell);

    const priceCell = document.createElement('td');
    priceCell.textContent = `$${crypto.current_price.toFixed(2)}`;
    row.appendChild(priceCell);

    const marketCapCell = document.createElement('td');
    marketCapCell.textContent = `$${crypto.market_cap.toLocaleString()}`;
    row.appendChild(marketCapCell);

    const priceChangeCell = document.createElement('td');
    priceChangeCell.textContent = `${crypto.price_change_percentage_24h.toFixed(2)}%`;
    row.appendChild(priceChangeCell);

    const volumeCell = document.createElement('td');
    volumeCell.textContent = `$${crypto.total_volume.toLocaleString()}`;
    row.appendChild(volumeCell);

    return row;
}

// Function to handle tab clicks and switch views
function handleTabClicks() {
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const cryptoContainer = document.getElementById('cryptoContainer');

    gridViewBtn.addEventListener('click', () => {
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        cryptoContainer.classList.add('grid-view');
        fetchData().then(data => renderGridView(data));
    });

    listViewBtn.addEventListener('click', () => {
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        cryptoContainer.classList.remove('grid-view');
        fetchData().then(data => renderListView(data));
    });
}

// Function to initialize the application
async function init() {
    handleTabClicks();
    await fetchData().then(data => renderGridView(data));
}

init();
