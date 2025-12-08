# PowerShell script for clean start
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Patkar's Realty - Clean Start" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Killing any existing processes..." -ForegroundColor Yellow

# Kill any existing node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Kill processes on specific ports
$ports = @(3001, 4001)
foreach ($port in $ports) {
    $processes = netstat -ano | Select-String ":$port " | ForEach-Object {
        $_.ToString().Split()[-1]
    }
    foreach ($pid in $processes) {
        if ($pid -match '^\d+$') {
            try {
                Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
            } catch {}
        }
    }
}

Write-Host "✅ Processes cleared" -ForegroundColor Green
Write-Host ""
Write-Host "Starting servers..." -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:4001" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""

npm run dev