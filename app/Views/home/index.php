<?= $this->extend('base_template') ?>

<?= $this->section('content') ?>

<div  api="/api/coa">
    <input id="search-input" type="text" placeholder="Cari..."
        class="mb-4 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">

    <div id="table-container"></div>

    <!-- Pagination -->
    <div id="pagination" class="mt-4 flex justify-end gap-2"></div>
</div>

<?= $this->endSection() ?>

<?= $this->section('script') ?>
<script src="<?= base_url('asset/js/httpRequest.js') ?>"></script>
<script src="<?= base_url('asset/js/Table.js') ?>"></script>
<script>

</script>
<?= $this->endSection() ?>

<?= $this->section('menu_bar') ?>
<h1 class="text-2xl font-bold">Dashboard</h1>
<p class="mt-4">Welcome to the admin panel!</p>

<?= $this->endSection() ?>