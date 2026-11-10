
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('alat_primers', function (Blueprint $table) {
            $table->string('nama')->nullable()->change();
            $table->string('merk')->nullable()->change();
            $table->string('serial_number')->nullable()->change();
            $table->string('range')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('alat_primers', function (Blueprint $table) {
            $table->string('nama')->nullable(false)->change();
            $table->string('merk')->nullable(false)->change();
            $table->string('serial_number')->nullable(false)->change();
            $table->string('range')->nullable(false)->change();
        });
    }
};
