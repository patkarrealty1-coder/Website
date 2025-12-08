# Safe server startup script
Write-Host "Starting Patkar's Realty Servers" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

# Kill any existing processes
Write-Host "Cleaning up existing processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "Ports cleared" -ForegroundColor Green
Write-Host ""

# Start backend first
Write-Host "Starting Backend Server..." -ForegroundColor Cyan
Write-Host "Port: 4001" -ForegroundColor Gray

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm run dev" -WindowStyle Normal

# Wait for backend to start
Write-Host "Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""

# Start frontend
Write-Host "Starting Frontend Server..." -ForegroundColor Magenta
Write-Host "Port: 3001" -ForegroundColor Gray

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "Servers Starting!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host "Backend:  http://localhost:4001" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3001" -ForegroundColor Magenta
Write-Host ""
Write-Host "Wait 10-15 seconds for both servers to fully start" -ForegroundColor Yellow
Write-Host "Then visit: http://localhost:3001" -ForegroundColor White