import os
from pydicom.dataset import FileDataset, FileMetaDataset
from pydicom.uid import UID
import datetime

def create_dummy_dicom(filename):
    file_meta = FileMetaDataset()
    file_meta.MediaStorageSOPClassUID = UID('1.2.840.10008.5.1.4.1.1.7') # Secondary Capture Image Storage
    file_meta.MediaStorageSOPInstanceUID = UID('1.2.3.4.5.6.7')
    file_meta.ImplementationClassUID = UID('1.2.3.4')

    ds = FileDataset(filename, {}, file_meta=file_meta, preamble=b"\0" * 128)
    
    ds.PatientName = "Test^Patient"
    ds.PatientID = "123456"
    
    ds.is_little_endian = True
    ds.is_implicit_VR = True

    dt = datetime.datetime.now()
    ds.ContentDate = dt.strftime('%Y%m%d')
    timeStr = dt.strftime('%H%M%S.%f')
    ds.ContentTime = timeStr

    ds.save_as(filename)

if __name__ == "__main__":
    create_dummy_dicom("dummy.dcm")
