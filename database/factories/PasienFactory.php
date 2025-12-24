<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pasien>
 */
class PasienFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
        'nama_lengkap' => fake()->name(),
        'alamat' => fake()->address(),
        'nomor_telepon' => fake()->phoneNumber(),
        'jenis_kelamin' => fake()->randomElement(['Laki-laki','Perempuan']),
        'tanggal_lahir' => fake()->date(),
        'golongan_darah' => fake()->randomElement(['A','B','AB','O']),
        'pekerjaan' => fake()->jobTitle(),
        'nomor_ktp' => fake()->numerify('################'),
        ];
    }
}
