@echo off
setlocal enabledelayedexpansion
title LemonMade Designs - Push pending deploy
cd /d "%~dp0.."
echo ==========================================
echo   Pushing committed changes to GitHub
echo   (Netlify will auto-deploy)
echo ==========================================
echo.
for /f "delims=" %%i in ('git log -1 --pretty^=%%s') do set subject=%%i
echo Latest commit: !subject!
findstr /i /c:"!subject!" docs\DEPLOY-NOTES.md >nul
if errorlevel 1 (
    echo.
    echo Deploy blocked: docs\DEPLOY-NOTES.md has no matching note for this commit.
    echo Add the release note first, then retry.
    pause
    exit /b 1
)
echo Matching deploy note found.
echo.
git push origin main
if errorlevel 1 (
    echo.
    echo Push failed - check your GitHub login, then re-run.
) else (
    echo.
    echo Pushed! Netlify is deploying now:
    echo https://app.netlify.com/projects/lemonmade-designs/deploys
    echo Live site: https://lemonmade-designs.netlify.app
)
echo.
pause
endlocal
