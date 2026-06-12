@echo off
echo Starting PACS Dashboard...
echo Please wait while the development server starts.
echo The browser will open automatically.

cd /d "c:\Users\arka\ILO_PACS\pacs-dashboard"

:: Clean up Next.js cache to avoid corruption causing OOM
if exist "c:\Users\arka\ILO_PACS\pacs-dashboard\.next" rmdir /s /q "c:\Users\arka\ILO_PACS\pacs-dashboard\.next"

:: Increase Node.js memory limit to 8GB to prevent heap out of memory errors
set NODE_OPTIONS=--max_old_space_size=8192

:: Launch the browser directly
start "" "http://localhost:3000"

:: Run the dev server in the current window
npm run dev
