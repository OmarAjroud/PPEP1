<?php
$dsn = 'mysql:host=127.0.0.1;dbname=atfp_db;charset=utf8mb4';
$user = 'root';
$pass = 'atfp123';

try {
    $pdo = new PDO($dsn, $user, $pass);
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

    if (empty($tables)) {
        echo "Database is EMPTY (no tables found).";
    } else {
        echo "Database contains " . count($tables) . " tables:\n";
        foreach ($tables as $table) {
            $count = $pdo->query("SELECT COUNT(*) FROM `$table`")->fetchColumn();
            echo "- $table: $count rows\n";
        }
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
