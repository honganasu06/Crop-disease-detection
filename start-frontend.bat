@echo off
echo ================================
echo AgriVision Frontend Startup
echo ================================
echo.

cd frontend || (
    echo [ERROR] Could not find 'frontend' directory.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo [WARNING] node_modules not found. Installing dependencies...
    call npm install
)

echo.
echo Starting React Development Server...
echo Frontend will be available at: http://localhost:3000
echo.

call npm run dev

if %errorlevel% neq 0 (
    echo [ERROR] Frontend server crashed or failed to start.
    pause
)
