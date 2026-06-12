import sys
import os
from pydicom import dcmread
from pynetdicom import AE, debug_logger

# Use debug logger if you want more verbose output, but we keep it off by default for clean Next.js logs
# debug_logger()

def send_dicom(ip, port, ae_title, dicom_path):
    # Setup AE
    ae = AE(ae_title=b'PACS_DASHBOARD')

    # Read DICOM
    if not os.path.exists(dicom_path):
        print(f"Error: DICOM file not found at {dicom_path}")
        sys.exit(1)

    try:
        ds = dcmread(dicom_path)
    except Exception as e:
        print(f"Error reading DICOM file: {e}")
        sys.exit(1)

    # Dynamically request the presentation context based on the file
    sop_class = ds.file_meta.MediaStorageSOPClassUID
    transfer_syntax = ds.file_meta.TransferSyntaxUID
    
    # We propose the file's transfer syntax, plus the standard uncompressed ones as fallbacks
    syntaxes = [transfer_syntax]
    if '1.2.840.10008.1.2' not in syntaxes: syntaxes.append('1.2.840.10008.1.2')
    if '1.2.840.10008.1.2.1' not in syntaxes: syntaxes.append('1.2.840.10008.1.2.1')
    
    ae.add_requested_context(sop_class, syntaxes)

    print(f"Connecting to {ae_title} at {ip}:{port}...")
    assoc = ae.associate(ip, port, ae_title=ae_title.encode())

    if assoc.is_established:
        print("Connection established. Sending C-STORE request...")
        status = assoc.send_c_store(ds)
        
        if status:
            if status.Status == 0x0000:
                print("SUCCESS: DICOM sent successfully.")
            else:
                print(f"FAILURE: C-STORE failed with status 0x{status.Status:04x}")
        else:
            print("FAILURE: Connection timed out or was aborted.")
            
        assoc.release()
    else:
        print("FAILURE: Association rejected, aborted or never connected.")

if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Usage: python dicom_sender.py <IP> <PORT> <AE_TITLE> <DICOM_FILE_PATH>")
        sys.exit(1)

    target_ip = sys.argv[1]
    target_port = int(sys.argv[2])
    target_ae_title = sys.argv[3]
    dicom_file = sys.argv[4]

    send_dicom(target_ip, target_port, target_ae_title, dicom_file)
