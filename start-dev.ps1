# PowerShell script to start both frontend and backend
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Patkar's Realty Development Servers" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend API:  http://localhost:4000" -ForegroundColor Cyan
Write-Host "Frontend:     http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

npm run dev
