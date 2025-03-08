<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateChartOfAccount extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'                => ['type' => 'INT', 'constraint' => 11, 'auto_increment' => true],
            'account_code'      => ['type' => 'VARCHAR', 'constraint' => 20, 'unique' => true],
            'account_name'      => ['type' => 'VARCHAR', 'constraint' => 100],
            'account_type'      => ['type' => 'VARCHAR', 'constraint' => 50],
            'description'       => ['type' => 'Text'],
            'created_at'        => ['type' => 'DATETIME'],
            'updated_at'        => ['type' => 'DATETIME', 'null' => true],
            'deleted_at'        => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('chart_of_account');
    }

    public function down()
    {
        $this->forge->dropTable('chart_of_accounts');
    }
}
