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
        Schema::create('motors', function (Blueprint $table) {
            $table->id();
            $table->string('item')->nullable();
            $table->string('label_ke')->unique();
            $table->string('alamat_motor')->nullable();
            $table->string('hp_kw')->nullable();
            $table->string('voltage')->nullable();
            $table->string('ampere')->nullable();
            $table->string('frame')->nullable();
            $table->string('ip_rating')->nullable();
            $table->string('frequency')->nullable();
            $table->string('manufacture')->nullable();
            $table->string('rpm')->nullable();
            $table->string('area')->nullable();
            $table->text('keterangan')->nullable();
            $table->string('status')->default('Di Workshop');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('motors');
    }
};
