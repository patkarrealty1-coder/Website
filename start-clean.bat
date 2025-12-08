@echo off
echo ========================================
echo   Patkar's Realty - Clean Start
echo ========================================
echo.
echo Killing any existing processes...

REM Kill any existing node processes
taskkill /F /IM node.exe >nul 2>&1

REM Kill processes on port 4001 and 3001
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :4001') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do taskkill /F /PID %%a >nul 2>&1

echo ✅ Processes cleared
echo.
echo Starting servers...
echo Backend: http://localhost:4001
echo Frontend: http://localhost:3001
echo.

npm run dev