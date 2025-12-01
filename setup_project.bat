@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo      AgriVision Project Setup Script
echo ===================================================
echo.

:: Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in your PATH.
    echo Please install Python from https://www.python.org/downloads/
    echo and make sure to check "Add Python to PATH" during installation.
    pause
    exit /b 1
) else (
    echo [OK] Python is installed.
)

:: Check for Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
) else (
    echo [OK] Node.js is installed.
)

echo.
echo ---------------------------------------------------
echo Setting up Backend...
echo ---------------------------------------------------

cd backend
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    if !errorlevel! neq 0 (
        echo [ERROR] Failed to create virtual environment.
        pause
        exit /b 1
    )
) else (
    echo Virtual environment already exists.
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing backend dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies.
    pause
    exit /b 1
)

echo Backend setup complete.
cd ..

echo.
echo ---------------------------------------------------
echo Setting up Frontend...
echo ---------------------------------------------------

cd frontend
echo Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install frontend dependencies.
    pause
    exit /b 1
)

echo Frontend setup complete.
cd ..

echo.
echo ===================================================
echo      Setup Completed Successfully!
echo ===================================================
echo.
echo You can now run the project using 'run_project.bat'
echo.
pause
