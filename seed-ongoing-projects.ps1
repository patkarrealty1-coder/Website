Write-Host "
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║           SEEDING ONGOING PROJECTS TO DATABASE                ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
" -ForegroundColor Cyan

Write-Host "Starting database seeding..." -ForegroundColor Yellow
Write-Host ""

# Navigate to backend directory and run seed script
Set-Location backend
node seedOngoingProjects.js

# Return to root directory
Set-Location ..

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                                ║" -ForegroundColor Green
Write-Host "║                    SEEDING COMPLETE!                           ║" -ForegroundColor Green
Write-Host "║                                                                ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "✅ 4 demo ongoing projects have been added to the database" -ForegroundColor Green
Write-Host ""
Write-Host "You can now:" -ForegroundColor Cyan
Write-Host "  1. View them on the homepage at http://localhost:3000" -ForegroundColor White
Write-Host "  2. View all at http://localhost:3000/ongoing-projects" -ForegroundColor White
Write-Host "  3. Manage them in admin panel at http://localhost:3000/management" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
