'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [ip, setIp] = useState('localhost');
  const [port, setPort] = useState('8042');
  const [aeTitle, setAeTitle] = useState('BViewer');
  
  const [sendingId, setSendingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{show: boolean, type: 'success' | 'error', message: string}>({ show: false, type: 'success', message: '' });
  const [isUploading, setIsUploading] = useState(false);

  const [syncSuccess, setSyncSuccess] = useState(false);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type, message }), 4000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setIsUploading(true);
    setSyncSuccess(false);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      showToast('success', 'Uploading file...');
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();
      
      if (!uploadRes.ok || !uploadData.success) {
        throw new Error(uploadData.error || 'Upload failed');
      }
      
      showToast('success', 'Upload complete. Syncing to BViewer...');
      
      const sendRes = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ip,
          port,
          aeTitle,
          dicomFile: uploadData.filename
        }),
      });
      const sendData = await sendRes.json();
      
      if (sendRes.ok && sendData.success) {
        showToast('success', `Successfully synced ${file.name} to BViewer!`);
        setSyncSuccess(true);
        setTimeout(() => setSyncSuccess(false), 5000); // Hide button after 5s
      } else {
        throw new Error(sendData.error || 'Sync failed');
      }
      
    } catch (error: any) {
      showToast('error', `Error: ${error.message}`);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <main className="container">
      <header className="header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', borderBottom: 'none' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem' }}>Picture Archiving and Communication System (PACS) for BViewer</h1>
          <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontStyle: 'italic' }}>
            Designed for ILO International Classification of Radiographs of Pneumoconioses
          </div>
        </div>
        <div className="status-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-color)', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: 600, border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          Status: Ready
        </div>
      </header>

      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'dashboard' ? 'active-google' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button className={`tab-btn ${activeTab === 'instructions' ? 'active-google' : ''}`} onClick={() => setActiveTab('instructions')}>BViewer Instructions</button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="tab-content">
          <section className="glass-panel" style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', color: 'var(--accent-color)' }}>
              Target BViewer Configuration
            </h2>
            <div className="config-section">
              <div className="input-group">
                <label>IP Address</label>
                <input 
                  type="text" 
                  value={ip} 
                  onChange={(e) => setIp(e.target.value)} 
                  placeholder="e.g. localhost or 192.168.1.5"
                />
              </div>
              <div className="input-group">
                <label>Port Number</label>
                <input 
                  type="text" 
                  value={port} 
                  onChange={(e) => setPort(e.target.value)} 
                  placeholder="e.g. 105 or 8042"
                />
              </div>
              <div className="input-group">
                <label>AE Title</label>
                <input 
                  type="text" 
                  value={aeTitle} 
                  onChange={(e) => setAeTitle(e.target.value)} 
                  placeholder="e.g. BViewer"
                />
              </div>
            </div>
          </section>

          <section className="glass-panel" style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', color: 'var(--accent-color)' }}>
              Upload New Study
            </h2>
            <div style={{ 
              border: '3px solid transparent', 
              padding: '3rem', 
              textAlign: 'center', 
              borderRadius: '12px', 
              background: 'linear-gradient(#f8f9fa, #f8f9fa) padding-box, linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853) border-box', 
              transition: 'all 0.3s ease' 
            }}>
              <input 
                type="file" 
                accept=".dcm"
                onChange={handleFileUpload}
                disabled={isUploading}
                style={{ display: 'none' }}
                id="dicom-upload"
              />
              {!syncSuccess ? (
                <>
                  <label htmlFor="dicom-upload" className="btn floating-element" style={{ cursor: 'pointer', display: 'inline-block', maxWidth: '300px', fontSize: '1.1rem', padding: '1rem 2rem' }}>
                    {isUploading ? 'Uploading & Syncing...' : 'Select DICOM File'}
                  </label>
                  <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                    Selected file will be uploaded and automatically sent to the configured BViewer.
                  </p>
                </>
              ) : (
                <div className="floating-element" style={{ background: '#10b981', color: 'white', padding: '1rem 2rem', borderRadius: '8px', display: 'inline-block', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(16,185,129,0.4)' }}>
                  ✅ Sync Successful!
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'instructions' && (
        <div className="tab-content glass-panel" style={{ padding: '3rem' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem', color: 'var(--primary-color)' }}>What Is BViewer?</h2>
          <div style={{ lineHeight: '1.8', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              BViewer is a computer program used by B Readers to interpret digitized radiographic images according to the ILO guidelines. BViewer can be set up to operate in any one of three supported interpretation environments:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '2rem', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '0.8rem' }}><strong>General Purpose.</strong> This is the default mode of operation when you install BViewer.</li>
              <li style={{ marginBottom: '0.8rem' }}><strong>NIOSH:</strong> The mode is used by NIOSH and others specifically for their occupational lung disease monitoring program.</li>
              <li style={{ marginBottom: '0.8rem' }}><strong>Test:</strong> This mode is used for administering B Reader certification and recertification examinations.</li>
            </ul>
            <p style={{ marginBottom: '1.5rem', background: 'rgba(59,130,246,0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary-color)' }}>
              Your NIOSH facilitator can configure the BViewer interpretation mode that is appropriate for your installation.
            </p>
            <h3 style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.4rem', color: 'var(--primary-color)' }}>How to Use with V Viewer</h3>
            <p style={{ marginBottom: '1rem' }}>
              You can also use this PACS with <strong>V Viewer</strong>. Just like BViewer, V Viewer requires network configuration to receive DICOM images:
            </p>
            <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', listStyleType: 'decimal' }}>
              <li style={{ marginBottom: '0.5rem' }}>Open V Viewer and navigate to its network or DICOM listener settings.</li>
              <li style={{ marginBottom: '0.5rem' }}>Note the <strong>IP Address</strong>, <strong>Port Number</strong>, and <strong>AE Title</strong> configured in V Viewer.</li>
              <li style={{ marginBottom: '0.5rem' }}>Enter these details in the <em>Dashboard</em> tab's Configuration section.</li>
              <li style={{ marginBottom: '0.5rem' }}>Upload your DICOM file, and it will be securely pushed directly to V Viewer.</li>
            </ol>
          </div>
        </div>
      )}

      <div className={`toast ${toast.type} ${toast.show ? 'show' : ''}`}>
        {toast.message}
      </div>

      <footer style={{
        marginTop: '4rem',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <div className="glass-panel" style={{ display: 'inline-block', padding: '1.5rem 2.5rem', borderRadius: '50px' }}>
          <p style={{ margin: 0, fontSize: '1.1rem', color: '#ec4899', fontWeight: 'bold' }}>
            Developer: Dr. Arkaprabha Sau
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#ec4899', fontWeight: 'bold' }}>
            MBBS, MD (Gold Medalist), DPH, Dip. Geriatric Medicine, CCEBDM, PhD (Computer Science & Engineering)
          </p>
        </div>
      </footer>
    </main>
  );
}
