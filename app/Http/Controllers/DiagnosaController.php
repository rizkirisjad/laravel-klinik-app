<?php

namespace App\Http\Controllers;

use App\Http\Requests\DiagnosaStoreRequest;
use App\Models\Diagnosa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DiagnosaController extends Controller
{
    public function index() {
        return Inertia::render('diagnosa/Index');
    }
    
    public function store(DiagnosaStoreRequest $request) {
        $request->merge([
            'dokter' => Auth::user()->name
        ]);

        Diagnosa::create($request->all());
        return redirect()->to('/diagnosa')->with('success', 'Data diagnosa berhasil disimpan.');
    }
}
