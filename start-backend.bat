@echo off
echo ================================
echo AgriVision Backend Startup
echo ================================
echo.

cd backend || (
    echo [ERROR] Could not find 'backend' directory.
    pause
    exit /b 1
)

if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat || (
    echo [ERROR] Failed to activate virtual environment.
    pause
    exit /b 1
)

echo.
echo Starting Flask Backend Server...
echo Backend will be available at: http://localhost:5000
echo.

python app.py

if %errorlevel% neq 0 (
    echo [ERROR] Backend server crashed or failed to start.
    pause
)
