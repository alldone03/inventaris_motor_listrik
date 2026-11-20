
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('alat_berats', function (Blueprint $table) {

            // Hapus kolom lama
            $table->dropColumn([
                'kapasitas',
                'lokasi',
            ]);

            // Tambahkan kolom baru
            $table->string('nomor_register_depnaker')->nullable();
            $table->date('tanggal_surat_keluar')->nullable();
            $table->date('tanggal_habis_berlaku')->nullable();
            $table->string('status_silo')->nullable();

        });
    }

    public function down(): void
    {
        Schema::table('alat_berats', function (Blueprint $table) {

            // Kembalikan kolom lama
            $table->string('kapasitas')->nullable();
            $table->string('lokasi')->nullable();

            // Hapus kolom baru
            $table->dropColumn([
                'nomor_register_depnaker',
                'tanggal_surat_keluar',
                'tanggal_habis_berlaku',
                'status_silo',
            ]);

        });
    }
};
