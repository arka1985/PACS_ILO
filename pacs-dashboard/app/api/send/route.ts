import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import util from 'util';
import fs from 'fs';

const execPromise = util.promisify(exec);

export async function POST(request: Request) {
  try {
    const { ip, port, aeTitle, dicomFile } = await request.json();

    if (!ip || !port || !aeTitle || !dicomFile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Path to the python script
    const scriptPath = path.resolve(process.cwd(), '../scripts/dicom_sender.py');
    let dicomPath = path.resolve(process.cwd(), '../scripts/uploads/', dicomFile);
    if (!fs.existsSync(dicomPath)) {
      dicomPath = path.resolve(process.cwd(), '../scripts/', dicomFile);
    }

    console.log(`Executing: python "${scriptPath}" ${ip} ${port} ${aeTitle} "${dicomPath}"`);
    
    const { stdout, stderr } = await execPromise(`python "${scriptPath}" ${ip} ${port} ${aeTitle} "${dicomPath}"`);
    
    console.log('Python stdout:', stdout);
    if (stderr) console.error('Python stderr:', stderr);

    if (stdout.includes('SUCCESS')) {
      return NextResponse.json({ success: true, message: stdout });
    } else {
      return NextResponse.json({ success: false, error: stdout || stderr }, { status: 500 });
    }

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
