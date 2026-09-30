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
        Schema::create('motor_checklists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('motor_id')->constrained('motors')->cascadeOnDelete();
            $table->string('no_form')->nullable();
            $table->date('tanggal_masuk')->nullable();
            $table->date('tanggal_selesai')->nullable();
            $table->string('area_lapangan')->nullable();
            $table->text('keluhan')->nullable();
            $table->string('daya_spek')->nullable();
            $table->string('tegangan_spek')->nullable();
            $table->string('ampere_spek')->nullable();
            $table->string('rpm_spek')->nullable();
            $table->string('nama_teknisi')->nullable();
            $table->string('nama_staf')->nullable();
            $table->string('status_perbaikan')->default('Selesai');
            $table->json('items')->nullable();
            $table->text('catatan_umum')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('motor_checklists');
    }
};
