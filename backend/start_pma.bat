@echo off
echo Starting phpMyAdmin at http://localhost:8081...
start http://localhost:8081
php -S localhost:8081 -t "..\tools\phpmyadmin"
pause
