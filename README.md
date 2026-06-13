# PACS_ILO

## DICOM Workflow Dashboard for NIOSH B Viewer and ILO Classification of Chest Radiographs

> **Note:** This project is provided solely for educational, research, training, and academic purposes. It is intended to support standardized digital chest radiograph workflows and should not be considered a certified medical device or a substitute for professional medical judgment.

---

## Overview

PACS_ILO is a DICOM-based imaging workflow solution developed to facilitate the review and classification of digital chest radiographs using the **ILO International Classification of Radiographs of Pneumoconioses**.

The project provides a simple dashboard for managing radiographic studies and streamlining image access for interpretation using **NIOSH B Viewer©**, thereby supporting occupational health surveillance, research, training, and academic activities.

---

## Features

* DICOM image management and retrieval
* Simple and user-friendly dashboard
* Integration with NIOSH B Viewer©
* Support for ILO classification workflows
* Quick deployment through automated startup scripts
* Suitable for occupational health, education, and research applications

---

## Repository Structure

```text
PACS_ILO/
│
├── pacs-dashboard/
├── scripts/
├── Start_Dashboard.bat
└── bviewer-setup.exe
```

---

## Installation

### Prerequisites

* Windows Operating System
* NIOSH B Viewer©
* DICOM-compatible imaging environment

### Setup

1. Clone the repository:

```bash
git clone https://github.com/arka1985/PACS_ILO.git
```

2. Install NIOSH B Viewer© using the provided installer or official distribution source.

3. Launch the dashboard:

```bash
Start_Dashboard.bat
```

---

## Workflow

1. Load or retrieve a chest radiograph.
2. Access the study through the PACS dashboard.
3. Open the image in NIOSH B Viewer©.
4. Perform ILO classification.
5. Save and document findings as required.

---

## NIOSH B Viewer©

This project supports the use of **NIOSH B Viewer©**, a software application developed through funding from the U.S. National Institute for Occupational Safety and Health (NIOSH) to minimize variability when reading and classifying digital chest radiographs.

NIOSH B Viewer© is copyrighted by NIOSH and remains the intellectual property of NIOSH. This repository does not claim ownership of NIOSH B Viewer© and is intended solely to facilitate its use within a DICOM-based workflow environment.

---

## Applications

* Occupational Health Surveillance
* Pneumoconiosis Screening Programs
* Silicosis Surveillance
* Chest Radiograph Classification
* Medical Education and Training
* Research and Academic Activities

---

## Standards Supported

* DICOM (Digital Imaging and Communications in Medicine)
* ILO International Classification of Radiographs of Pneumoconioses

---

## Developed By

**Dr. Arkaprabha Sau**
MBBS, MD (Gold Medalist), DPH, Dip. Geriatric Medicine, CCEBDM
PhD (Computer Science & Engineering)

---

## Disclaimer

This software has been developed for **educational, research, training, and academic purposes only**.

PACS_ILO is provided in good faith to support learning, scientific research, occupational health initiatives, and the standardized interpretation of chest radiographs. It is not intended to replace clinical judgment, professional medical interpretation, regulatory requirements, or certified commercial medical imaging systems.

Users are solely responsible for ensuring compliance with applicable laws, regulations, institutional policies, data privacy requirements, and medical device regulations within their jurisdiction.

The author makes no warranties regarding the accuracy, completeness, reliability, or fitness of the software for any particular purpose. Use of this software is entirely at the user's own risk.

---

## License

### MIT License

Copyright (c) 2026 Dr. Arkaprabha Sau

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to the inclusion of the above copyright notice and this permission notice in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.

### Third-Party Software Notice

NIOSH B Viewer© is a separate software product developed and copyrighted by the U.S. National Institute for Occupational Safety and Health (NIOSH).

The MIT License applied to PACS_ILO does not grant any rights to NIOSH B Viewer© or any other third-party software. Users must comply with the respective licensing terms of such software.
