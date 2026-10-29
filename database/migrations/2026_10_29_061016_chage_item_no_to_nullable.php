<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('governors', function (Blueprint $table) {
            $table->dropUnique(['item_no']);

            $table->string('item_no')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('governors', function (Blueprint $table) {
            $table->string('item_no')->unique()->change();
        });
    }
};
