<?php

namespace App\Exceptions;

use Exception;

class UnauthorizedActionException extends Exception
{
    protected $message;

    public function __construct($message = 'Action unauthorized.')
    {
        $this->message = $message;
    }
    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        return response([
            'message' => $this->message
        ], 403);
    }
}
