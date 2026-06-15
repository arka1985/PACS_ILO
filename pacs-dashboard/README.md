# PACS Dashboard

A Next.js application for a PACS dashboard, featuring DICOM file transmission via Python scripts.

## Prerequisites

Before running this project on a new computer, ensure you have the following installed:

### 1. Node.js (For the Web App)
- Download and install the **LTS version** from [nodejs.org](https://nodejs.org/).
- **Important:** During installation, ensure the option to **"Add to PATH"** is checked.
- Restart your Command Prompt after installation.

### 2. Python (For the DICOM Sync Scripts)
The DICOM sender scripts require Python and specific modules (`pydicom`, `pynetdicom`).
- Download and install Python from [python.org](https://python.org/).
- **Important:** During installation, check the box that says **"Add Python to PATH"**.
- After installing Python, open your Command Prompt and run the following command to install the required modules:
  ```bash
  pip install pydicom pynetdicom
  ```

## Getting Started

The easiest way to start the dashboard is by double-clicking the `Start_Dashboard.bat` file in the main folder. It will automatically install Node modules and launch the development server.

Alternatively, you can start it manually from the `pacs-dashboard` folder:
1. `npm install`
2. `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

## Features
- Next.js Web Dashboard
- Automated DICOM transmission using Python (`dicom_sender.py`)
