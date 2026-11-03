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
        Schema::create('alat_berats', function (Blueprint $table) {
            $table->id();

            $table->string('nama_alat');
            $table->string('merk');
            $table->string('model');
            $table->string('nomor_unit');
            $table->string('kapasitas')->nullable();
            $table->string('lokasi')->nullable();
            $table->string('status')->default('Siap Operasi');
            $table->text('keterangan')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alat_berats');
    }
};
