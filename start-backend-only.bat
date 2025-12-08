@echo off
echo ========================================
echo   Starting Backend Server Only
echo ========================================
echo.
echo Backend will run on: http://localhost:4001
echo Health check: http://localhost:4001/api/health
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd backend
npm run dev