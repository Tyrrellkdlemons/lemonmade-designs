@echo off
title LemonMade Designs - Deploy Check
cd /d "%~dp0.."

echo ==========================================
echo   LemonMade Designs - Deploy Check
echo ==========================================
echo.
echo [1/5] Installing locked dependencies...
call npm ci
if errorlevel 1 (
    echo npm install FAILED.
    pause
    exit /b 1
)
echo.
echo [2/5] Running tests and type checks...
call npm test
if errorlevel 1 (
    echo Tests FAILED - fix the errors above.
    pause
    exit /b 1
)
call npm run lint
if errorlevel 1 (
    echo Type checks FAILED - fix the errors above.
    pause
    exit /b 1
)
echo.
echo [3/5] Running production build...
call npm run build
if errorlevel 1 (
    echo Build FAILED - fix the errors above.
    pause
    exit /b 1
)
echo.
echo [4/5] Checking Netlify output folder...
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
if exist "dist\logo\lemonmade-logo-full.png" (
    echo   OK: logo assets copied to dist.
) else (
    echo   PROBLEM: logo assets missing from dist!
)
if exist "dist\__forms.html" (
    echo   OK: Netlify static forms file exists.
) else (
    echo   PROBLEM: dist\__forms.html missing!
)
echo.
echo [5/5] Common issue checklist:
echo   - Netlify build command should be: npm run build
echo   - Netlify publish directory should be: dist
echo   - SPA redirect is configured in netlify.toml
echo   - Eight production forms are registered in public\__forms.html
echo   - project-estimate includes calculated range and package fields
echo   - RDAP domain helper exists in netlify\functions\rdap-domain.mjs
echo   - Every production commit has a matching entry in docs\DEPLOY-NOTES.md
echo.
echo Next steps: run scripts\push-only.cmd to commit and push,
echo or scripts\setup-github-netlify.cmd for first-time setup.
echo.
pause
