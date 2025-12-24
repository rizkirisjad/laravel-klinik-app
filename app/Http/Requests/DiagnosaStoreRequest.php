<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DiagnosaStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'pasien_id' => 'required',
            'keluhan' => 'required',
            'diagnosa' => 'required',
            'tindakan' => 'required',
            'obat' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'pasien_id.required' => 'Pasien wajib diisi.',
            'keluhan.required' => 'Keluhan wajib diisi.',
            'diagnosa.required' => 'Diagnosa wajib diisi.',
            'tindakan.required' => 'Tindakan wajib diisi.',
            'obat.required' => 'Obat wajib diisi.',
        ];
    }
}
