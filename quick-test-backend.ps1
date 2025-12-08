# Quick backend test script
Write-Host "Testing Backend Connection..." -ForegroundColor Cyan

# Test if backend is running
try {
    $health = Invoke-WebRequest -Uri "http://localhost:4001/api/health" -TimeoutSec 3
    $healthData = $health.Content | ConvertFrom-Json
    
    Write-Host "Backend Status: $($healthData.status)" -ForegroundColor Green
    Write-Host "MongoDB: $($healthData.mongodb)" -ForegroundColor Green
    Write-Host "Port: $($healthData.port)" -ForegroundColor Green
    
} catch {
    Write-Host "Backend not responding on port 4001" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Gray
    
    # Check if anything is running on 4001
    $port4001 = netstat -ano | Select-String ":4001"
    if ($port4001) {
        Write-Host "Something is running on port 4001:" -ForegroundColor Yellow
        $port4001
    } else {
        Write-Host "Nothing running on port 4001 - backend needs to be started" -ForegroundColor Blue
    }
}

# Test debug endpoint
try {
    $debug = Invoke-WebRequest -Uri "http://localhost:4001/api/debug" -TimeoutSec 3
    Write-Host "Debug endpoint working" -ForegroundColor Green
} catch {
    Write-Host "Debug endpoint not working" -ForegroundColor Red
}