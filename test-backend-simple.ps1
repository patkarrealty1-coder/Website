# Simple backend test
Write-Host "Testing Backend Connection..." -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "http://localhost:4001/api/health" -TimeoutSec 5
    Write-Host "SUCCESS: Backend is running on port 4001" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "ERROR: Backend not responding" -ForegroundColor Red
    Write-Host "Make sure backend is running with: npm run backend" -ForegroundColor Yellow
}