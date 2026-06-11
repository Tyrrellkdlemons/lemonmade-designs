@echo off
title LemonMade Designs - Deploy Check
cd /d "%~dp0.."

echo ==========================================
echo   LemonMade Designs - Deploy Check
echo ==========================================
echo.
echo [1/4] Installing dependencies...
call npm install
if errorlevel 1 (
    echo npm install FAILED.
    pause
    exit /b 1
)
echo.
echo [2/4] Running build...
call npm run build
if errorlevel 1 (
    echo Build FAILED - fix the errors above.
    pause
    exit /b 1
)
echo.
echo [3/4] Checking Netlify output folder...
if exist "dist\index.html" (
    echo   OK: dist\index.html exists.
) else (
    echo   PROBLEM: dist\index.html missing!
)
if exist "netlify.toml" (
    echo   OK: netlify.toml exists.
) else (
    echo   PROBLEM: netlify.toml missing!
)
if exist "dist\logo\lemonmade-logo-md.png" (
    echo   OK: logo assets copied to dist.
) else (
    echo   PROBLEM: logo assets missing from dist!
)
echo.
echo [4/4] Common issue checklist:
echo   - Netlify build command should be: npm run build
echo   - Netlify publish directory should be: dist
echo   - SPA redirect is configured in netlify.toml
echo   - Forms (start-project, mockup-builder, domain-help) are in index.html
echo.
echo Next steps: run scripts\push-only.cmd to commit and push,
echo or scripts\setup-github-netlify.cmd for first-time setup.
echo.
pause
