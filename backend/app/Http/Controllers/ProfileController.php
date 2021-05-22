<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Get authenticated user's profile.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        return new UserResource(auth()->user());
    }
}
