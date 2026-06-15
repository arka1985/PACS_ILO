@echo off
title PACS Dashboard Server
echo Starting PACS Dashboard...
echo Please wait while the development server starts.

cd /d "%~dp0pacs-dashboard"

if exist ".next" rmdir /s /q ".next"

if not exist "node_modules\" (
    echo Installing Node dependencies for the first time... Please wait.
    call npm install
)

echo Installing/Updating Python dependencies...
call python -m pip install pydicom pynetdicom

set NODE_OPTIONS=--max_old_space_size=8192

echo.
echo ========================================================
echo The server will start now.
echo It may take a few moments for the page to load.
echo If the browser shows "Can't connect", just wait a few 
echo seconds and refresh the page.
echo ========================================================
echo.

start "" "http://localhost:3000"

call npm run dev
pause
