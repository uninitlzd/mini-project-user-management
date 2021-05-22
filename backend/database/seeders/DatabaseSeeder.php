<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Create Admin Account
        // \App\Models\User::factory()->create([
        //     'name' => 'Admin',
        //     'email' => 'admin@example.com',
        //     'department' => 'admin',
        //     'title' => 'admin',
        //     'is_admin' => true,
        // ]);

        // Create User Accounts
        \App\Models\User::factory(50)->create();
    }
}
