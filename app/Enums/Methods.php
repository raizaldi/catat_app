<?php

namespace App\Enums;

enum MethoType: string
{
    case get = "GET";
    case post = "POST";
    case put = "PUT";
    case delete = "DELETE";
}