<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="csrf" content="<?php echo csrf_token(); ?>">

        <title>Tasks</title>

        @vite(["resources/css/app.css", "resources/js/app.js"])
    </head>
    <body class="bg-neutral-200">
        <div id="app"></div>
    </body>
</html>

