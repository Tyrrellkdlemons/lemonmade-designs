@echo off
setlocal enabledelayedexpansion
title LemonMade Designs - Build, Note & Push
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
echo Running tests...
call npm test
if errorlevel 1 (
    echo.
    echo TESTS FAILED - fix before pushing.
    pause
    exit /b 1
)
echo.
echo Build and tests succeeded. Current git status:
echo ------------------------------------------
git status
echo ------------------------------------------
echo.
echo Every production deploy needs a deploy note.
echo It becomes the commit message AND the Netlify deploy title.
echo.
set /p msg="Deploy note (short title of what changed): "
if "!msg!"=="" (
    echo No deploy note given - aborting.
    pause
    exit /b 1
)
set /p detail="One-line detail (optional, Enter to skip): "

rem Append entry to docs/DEPLOY-NOTES.md
for /f "tokens=1-3 delims=/ " %%a in ("%date%") do set today=%%c-%%a-%%b
echo.>> docs\DEPLOY-NOTES.md
echo ## %today% - !msg!>> docs\DEPLOY-NOTES.md
if not "!detail!"=="" echo - !detail!>> docs\DEPLOY-NOTES.md

git add -A
git commit -m "!msg!"
echo.
set /p confirm="Push to GitHub now? This triggers a live Netlify deploy. (y/n): "
if /i not "!confirm!"=="y" (
    echo Push cancelled. Your commit (and deploy note) is saved locally.
    pause
    exit /b 0
)
git push
if errorlevel 1 (
    echo Push failed - check your connection and GitHub login.
) else (
    echo Pushed successfully. Netlify will deploy with title: "!msg!"
    echo Check progress: https://app.netlify.com/projects/lemonmade-designs/deploys
)
echo.
pause
endlocal
