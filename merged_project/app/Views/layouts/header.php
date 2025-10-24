<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title><?= htmlspecialchars($title ?? 'App') ?></title>
  <style>body{font-family:Arial,Helvetica,sans-serif;margin:20px;} .card{border:1px solid #ddd;padding:12px;border-radius:6px;margin-bottom:12px}</style>
</head>
<body>
  <header>
    <h1><?= htmlspecialchars($title ?? 'Pantry Healthy') ?></h1>
    <nav><a href="/">Home</a> | <a href="/foods">Foods</a> | <a href="/users">Users</a></nav>
    <hr>
  </header>
  <main>
