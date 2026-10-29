<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        
        
        // 3. Ubah tabel 'users' (Drop kolom lama dan tambahkan Foreign Key baru)
        Schema::table('users', function (Blueprint $table) {
            // Hapus kolom 'role' dan 'Jabatan' yang lama
            $table->dropColumn(['role', 'Jabatan']);

            $table->string('jabatan')->nullable();
            $table->string('bagian')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Hapus foreign key dan kolom relasi
            $table->dropForeign(['jabatan_id']);
            $table->dropForeign(['bagian_id']);
            $table->dropColumn(['jabatan_id', 'bagian_id']);

            // Kembalikan kolom lama
            $table->string('role')->default('user');
            $table->string('Jabatan')->nullable();
        });

        // Hapus tabel jabatan dan bagian
        Schema::dropIfExists('bagian');
        Schema::dropIfExists('jabatan');
    }
};
