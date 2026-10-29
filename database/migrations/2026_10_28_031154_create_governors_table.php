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
        Schema::create('governors', function (Blueprint $table) {
            $table->id();
            $table->string('item_no')->unique();
            $table->string('governor_type')->nullable();
            $table->string('rotation')->nullable();
            $table->string('speed_range_rpm')->nullable();
            $table->string('part_no')->nullable();
            $table->string('serial_no')->nullable();
            $table->text('ket')->nullable();
            $table->string('stock_code')->nullable();
            $table->string('area')->nullable();
            $table->string('pabrik')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('governors');
    }
};
