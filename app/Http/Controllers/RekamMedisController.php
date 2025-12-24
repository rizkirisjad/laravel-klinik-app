<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RekamMedisController extends Controller
{
    public function index() {
        return Inertia::render('rekam-medis/Index');
    }
}
