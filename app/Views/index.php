<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex h-screen">
    <!-- Sidebar -->
    <div id="sidebar" class="fixed inset-y-0 left-0 w-64 bg-blue-200 p-5 transform -translate-x-full transition-transform md:translate-x-0 md:static md:w-64">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">Admin Panel</h2>
            <button class="md:hidden" onclick="toggleSidebar()">
                ✖
            </button>
        </div>
        <nav class="space-y-3">
            <a href="#" class="flex items-center space-x-2 p-2 bg-blue-300 rounded-md">🏠 <span>Dashboard</span></a>
            <a href="#" class="flex items-center space-x-2 p-2 hover:bg-blue-300 rounded-md">👤 <span>Users</span></a>
            <a href="#" class="flex items-center space-x-2 p-2 hover:bg-blue-300 rounded-md">⚙ <span>Settings</span></a>
        </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-6 md:ml-4">
        <button class="md:hidden bg-gray-200 p-2 rounded" onclick="toggleSidebar()">
            ☰
        </button>
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <p class="mt-4">Welcome to the admin panel!</p>

        <!-- Sample Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div class="bg-white p-5 rounded-lg shadow-md">
                <h2 class="text-lg font-bold">Total Users</h2>
                <p class="text-2xl font-semibold">1,250</p>
            </div>
            <div class="bg-white p-5 rounded-lg shadow-md">
                <h2 class="text-lg font-bold">Total Orders</h2>
                <p class="text-2xl font-semibold">320</p>
            </div>
            <div class="bg-white p-5 rounded-lg shadow-md">
                <h2 class="text-lg font-bold">Revenue</h2>
                <p class="text-2xl font-semibold">$12,500</p>
            </div>
        </div>
    </div>
    <div api="/api/coa"></div>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="<?= base_url('asset/js/httpRequest.js') ?>"></script>
  <script src="<?= base_url('asset/js/Table.js') ?>"></script>
    <script>
        function toggleSidebar() {
            document.getElementById("sidebar").classList.toggle("-translate-x-full");
        }
    </script>
</body>
</html>
