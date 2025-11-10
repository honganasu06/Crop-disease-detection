@echo off
echo ================================
echo AgriVision Backend Startup
echo ================================
echo.

cd backend

echo Checking Python installation...
python --version
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Checking virtual environment...
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
)

echo.
echo Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo Installing dependencies...
pip install -r requirements.txt

echo.
echo ================================
echo Starting Flask Backend Server
echo ================================
echo Backend will be available at: http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

python app.py

pause
