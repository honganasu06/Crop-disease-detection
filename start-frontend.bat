@echo off
echo ================================
echo AgriVision Frontend Startup
echo ================================
echo.

cd frontend

echo Checking Node.js installation...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Checking npm installation...
npm --version
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
npm install

echo.
echo ================================
echo Starting React Development Server
echo ================================
echo Frontend will be available at: http://localhost:5173
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause
