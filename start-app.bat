@echo off
echo ===================================================
echo      AgriVision Unified Launcher
echo ===================================================
echo.

:: Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in your PATH.
    pause
    exit /b 1
)

:: Check for Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    pause
    exit /b 1
)

echo Starting Backend Server...
start "AgriVision Backend" cmd /k "start-backend.bat"

echo Starting Frontend Server...
start "AgriVision Frontend" cmd /k "start-frontend.bat"

echo.
echo Application is starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Opening application in browser...
timeout /t 5 >nul
start http://localhost:3000

echo.
echo Done! You can close this window, but keep the other two windows open.
pause
