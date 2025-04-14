<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <?= $this->renderSection('css'); ?>
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
            <a href="<?= base_url('/') ?>" class="flex items-center space-x-2 p-2 bg-blue-300 rounded-md">🏠 <span>Dashboard</span></a>
            <a href="<?= base_url('/uses') ?>" class="flex items-center space-x-2 p-2 hover:bg-blue-300 rounded-md">👤 <span>Users</span></a>
            <a href="<?= base_url('/settings') ?>" class="flex items-center space-x-2 p-2 hover:bg-blue-300 rounded-md">⚙ <span>Settings</span></a>
        </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-6 md:ml-4">
        <button class="md:hidden bg-gray-200 p-2 rounded" onclick="toggleSidebar()">
            ☰
        </button>

        <?= $this->renderSection('menu_bar'); ?>
      

        <!-- Sample Cards -->
        <div>
            <?= $this->renderSection('content') ?>
        </div>
    </div>
    
    
    <?= $this->renderSection('script'); ?>
    <script>
        function toggleSidebar() {
            document.getElementById("sidebar").classList.toggle("-translate-x-full");
        }
    </script>
</body>

</html>