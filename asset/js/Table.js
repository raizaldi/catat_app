document.addEventListener("DOMContentLoaded", function () {

     // Ambil elemen yang memiliki atribut "api"
    const element = document.querySelector("div[api]");
    if (element) 
    {

        let token = sessionStorage.getItem("jwt_cookies");
        const authHeader = { Authorization: `Bearer ${token}` };
        

        const API_URL = element.getAttribute("api"); // Ambil nilai dari atribut API
        httpRequest(API_URL, "GET", null, authHeader)
        .then((result) => {
            allData = result.data;
            filteredData = result.data;
            renderTable(filteredData);
        })
        .catch((error) => console.error("GET Error:", error));
    
    }
});

let allData = [];
let filteredData = [];
let currentPage = 1;
const rowsPerPage = 5;
// Search filter
document.getElementById('search-input').addEventListener('input', function () {
    const keyword = this.value.toLowerCase();
  
    filteredData = allData.filter(row =>
      Object.values(row).some(val => {
        if (val === null || val === undefined) return false;
        return val.toString().toLowerCase().includes(keyword);
      })
    );
  
    currentPage = 1;
    renderTable(filteredData);
  });

// Render tabel sesuai halaman saat ini
function renderTable(data) {
    const container = document.getElementById('table-container');
    container.innerHTML = '';

    if (data.length === 0) {
      container.innerHTML = '<p class="text-center text-gray-500">Tidak ada data.</p>';
      document.getElementById('pagination').innerHTML = '';
      return;
    }

    const table = document.createElement('table');
    table.className = "min-w-full border border-gray-200";

    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
      const th = document.createElement('th');
      th.textContent = key;
      th.className = "cursor-pointer px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-700 hover:bg-gray-200";
      th.onclick = () => sortTableByKey(key);
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const start = (currentPage - 1) * rowsPerPage;
    const paginatedData = data.slice(start, start + rowsPerPage);

    paginatedData.forEach(row => {
      const tr = document.createElement('tr');
      tr.className = "hover:bg-gray-50";
      Object.values(row).forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        td.className = "px-4 py-2 text-sm text-gray-700";
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    container.appendChild(table);
    renderPagination(data.length);
  }

  function renderPagination(totalRows) {
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = `px-3 py-1 rounded border ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`;
      btn.onclick = () => {
        currentPage = i;
        renderTable(filteredData);
      };
      pagination.appendChild(btn);
    }
  }

  // Sort
  let currentSort = { key: null, asc: true };
  function sortTableByKey(key) {
    if (currentSort.key === key) currentSort.asc = !currentSort.asc;
    else currentSort = { key, asc: true };

    filteredData.sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      if (typeof valA === 'number') return currentSort.asc ? valA - valB : valB - valA;
      return currentSort.asc
        ? valA.toString().localeCompare(valB.toString())
        : valB.toString().localeCompare(valA.toString());
    });

    currentPage = 1;
    renderTable(filteredData);
  }