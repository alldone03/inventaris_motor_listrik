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
        Schema::table('motor_checklists', function (Blueprint $table) {
            $table->date('tanggal_approval_teknisi')->nullable();
            $table->date('tanggal_approval_staf')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('motor_checklists', function (Blueprint $table) {
            $table->dropColumn(['tanggal_approval_teknisi', 'tanggal_approval_staf']);
        });
    }
};
