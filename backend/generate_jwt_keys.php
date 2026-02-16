<?php
$passphrase = 'your_secret_passphrase'; // Must match .env

$config = [
    "digest_alg" => "sha512",
    "private_key_bits" => 4096,
    "private_key_type" => OPENSSL_KEYTYPE_RSA,
];

// Verify OpenSSL
putenv("OPENSSL_CONF=" . __DIR__ . "\\openssl.cnf");
if (!extension_loaded('openssl')) {
    die("OpenSSL extension not loaded.");
}

// Generate keys
$res = openssl_pkey_new($config);

if (!$res) {
    die("Failed to generate private key. Check OPENSSL_CONF. Error: " . openssl_error_string());
}

openssl_pkey_export($res, $privKey, $passphrase);

$pubKey = openssl_pkey_get_details($res);
$pubKey = $pubKey["key"];

if (!is_dir('config/jwt')) {
    mkdir('config/jwt', 0777, true);
}

file_put_contents('config/jwt/private.pem', $privKey);
file_put_contents('config/jwt/public.pem', $pubKey);

echo "Keys generated successfully.\n";
?>
