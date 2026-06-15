@echo off
echo Starting PACS Dashboard...
echo Please wait while the development server starts.
echo The browser will open automatically.

:: Change directory to the pacs-dashboard folder relative to where this script is located
cd /d "%~dp0pacs-dashboard"

:: Clean up Next.js cache to avoid corruption causing OOM
if exist ".next" rmdir /s /q ".next"

:: Install dependencies if they are missing
if not exist "node_modules\" (
    echo Installing dependencies for the first time... Please wait.
    npm install
)

:: Increase Node.js memory limit to 8GB to prevent heap out of memory errors
set NODE_OPTIONS=--max_old_space_size=8192

:: Launch the browser directly
start "" "http://localhost:3000"

:: Run the dev server in the current window
npm run dev
