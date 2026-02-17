<?php

// Script to fetch Tunisia Data from GitHub Raw
$url = "https://raw.githubusercontent.com/marwen-nus/TUNISIAN-CITIES-JSON/main/tunisia.json";
$context = stream_context_create([
    "http" => [
        "header" => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    ]
]);

$json = file_get_contents($url, false, $context);

if ($json === false) {
    echo "Failed to fetch data from $url\n";
    exit(1);
}

// Ensure directory exists
if (!is_dir(__DIR__ . '/var/data')) {
    mkdir(__DIR__ . '/var/data', 0777, true);
}

file_put_contents(__DIR__ . '/var/data/tunisia.json', $json);
echo "Data fetched and saved to var/data/tunisia.json\n";
echo "Size: " . strlen($json) . " bytes\n";
