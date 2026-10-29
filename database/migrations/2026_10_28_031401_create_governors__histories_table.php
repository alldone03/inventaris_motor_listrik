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
        Schema::create('governors__histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('governor_id')
                ->constrained('governors')
                ->cascadeOnDelete();

            $table->date('history_date');
            $table->string('history_type');
            $table->string('pdf_link');
            

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('governors__histories');
    }
};
