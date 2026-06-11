@echo off
setlocal enabledelayedexpansion
title LemonMade Designs - Safe Push
cd /d "%~dp0.."

echo ==========================================
echo   LemonMade Designs - Build ^& Push
echo ==========================================
echo.
echo Running build first to make sure nothing is broken...
call npm run build
if errorlevel 1 (
    echo.
    echo BUILD FAILED - fix errors before pushing.
    pause
    exit /b 1
)
echo.
echo Build succeeded. Current git status:
echo ------------------------------------------
git status
echo ------------------------------------------
echo.
set /p msg="Commit message: "
if "!msg!"=="" (
    echo No commit message given - aborting.
    pause
    exit /b 1
)
git add -A
git commit -m "!msg!"
echo.
set /p confirm="Push to GitHub now? This may trigger a live Netlify deploy. (y/n): "
if /i not "!confirm!"=="y" (
    echo Push cancelled. Your commit is saved locally.
    pause
    exit /b 0
)
git push
if errorlevel 1 (
    echo Push failed - check your connection and GitHub login.
) else (
    echo Pushed successfully.
)
echo.
pause
endlocal
