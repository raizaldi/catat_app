<?= $this->extend('base_template') ?>

<?= $this->section('content') ?>
<div api="/api/coa"></div>
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