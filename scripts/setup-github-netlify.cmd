@echo off
setlocal enabledelayedexpansion
title LemonMade Designs - Setup GitHub + Netlify
cd /d "%~dp0.."

echo ==========================================
echo   LemonMade Designs - Setup ^& Deploy
echo ==========================================
echo.
echo  [1] Install dependencies (npm install)
echo  [2] Run build (npm run build)
echo  [3] Initialize Git + push to GitHub
echo  [4] Netlify deployment help
echo  [5] Do everything (1 -^> 2 -^> 3 -^> 4)
echo  [6] Exit
echo.
set /p choice="Pick an option (1-6): "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto build
if "%choice%"=="3" goto git
if "%choice%"=="4" goto netlify
if "%choice%"=="5" goto all
if "%choice%"=="6" goto end
echo Invalid choice.
pause
goto end

:all
call :doinstall
if errorlevel 1 goto fail
call :dobuild
if errorlevel 1 goto fail
goto git

:install
call :doinstall
if errorlevel 1 goto fail
goto done

:build
call :dobuild
if errorlevel 1 goto fail
goto done

:doinstall
echo.
echo Installing dependencies...
call npm install
exit /b %errorlevel%

:dobuild
echo.
echo Running build...
call npm run build
exit /b %errorlevel%

:git
echo.
if not exist ".git" (
    echo Initializing Git repository...
    git init
    git branch -M main
)
git add -A
set /p msg="Commit message (default: 'LemonMade Designs site'): "
if "!msg!"=="" set msg=LemonMade Designs site
git commit -m "!msg!"
echo.
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    set /p repo="Paste your GitHub repo URL (e.g. https://github.com/you/lemonmade-designs.git): "
    if "!repo!"=="" (
        echo No repo URL given - skipping push.
        goto netlify
    )
    git remote add origin "!repo!"
)
echo Pushing to GitHub...
git push -u origin main
if errorlevel 1 (
    echo.
    echo Push failed. Check your repo URL and GitHub login, then re-run this script.
    goto fail
)
goto netlify

:netlify
echo.
echo ==========================================
echo   Netlify Deployment
echo ==========================================
where netlify >nul 2>&1
if %errorlevel%==0 (
    echo Netlify CLI detected.
    set /p usecli="Deploy with Netlify CLI now? (y/n): "
    if /i "!usecli!"=="y" (
        call netlify deploy --build --prod
        goto done
    )
)
echo.
echo Manual steps:
echo  1. Go to https://app.netlify.com and click "Add new project"
echo  2. Choose "Import an existing project" and pick your GitHub repo
echo  3. Build command:    npm run build
echo  4. Publish directory: dist
echo  5. Deploy! Netlify Forms will be detected automatically.
goto done

:fail
echo.
echo Something failed. Read the messages above, fix the issue, and re-run.
:done
echo.
pause
:end
endlocal
