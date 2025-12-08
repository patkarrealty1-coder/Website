@echo off
echo ========================================
echo   Starting Patkar's Realty Servers
echo ========================================
echo.

echo Killing existing processes...
taskkill /F /IM node.exe >nul 2>&1

echo.
echo Starting Backend (Port 4001)...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo Starting Frontend (Port 3001)...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Servers are starting!
echo Backend:  http://localhost:4001
echo Frontend: http://localhost:3001
echo ========================================
echo.
echo Wait 10-15 seconds for both to fully load
echo Then visit: http://localhost:3001
pause