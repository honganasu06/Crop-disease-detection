@echo off
echo ===================================================
echo      Starting AgriVision Project
echo ===================================================
echo.

:: Start Backend
echo Starting Backend Server...
start "AgriVision Backend" cmd /k "cd backend && if exist venv\Scripts\activate.bat (call venv\Scripts\activate.bat) else (echo Venv not found, trying global python...) && python app.py"

:: Start Frontend
echo Starting Frontend Server...
start "AgriVision Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Project is starting up...
echo Backend will be at http://localhost:5000
echo Frontend will be at http://localhost:5173 (or similar)
echo.
echo Close the popup windows to stop the servers.
echo.
pause
