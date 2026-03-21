import React, { useState } from 'react';

const ManageContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [content, setContent] = useState('');

  const handleSave = () => {
    alert(`Saved changes for ${activeTab}. Content changes will be pushed to the DB in final production.`);
  };

  return (
    <>
      <style>{`
        /* Ultra Premium Mobile Responsive CSS */
        @media (max-width: 768px) {
          .manage-content-wrapper {
            padding: 1.25rem !important;
            border-radius: 16px !important;
          }
          .manage-content-layout {
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          
          /* Magic Horizontal Scrollable Tabs for Mobile */
          .manage-content-tabs {
            flex: none !important;
            flex-direction: row !important;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 0.5rem;
            -webkit-overflow-scrolling: touch;
            /* Smooth mask for faded edges effect */
            mask-image: linear-gradient(to right, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, black 90%, transparent);
          }
          
          /* Hide scrollbar for clean premium look */
          .manage-content-tabs::-webkit-scrollbar {
            display: none;
          }
          .manage-content-tabs {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .manage-content-tab-btn {
            white-space: nowrap !important;
            padding: 0.6rem 1.25rem !important;
            border-radius: 30px !important; /* Premium App-like pill shape */
            text-align: center !important;
            font-size: 0.85rem !important;
            transition: all 0.3s ease !important;
          }

          .manage-content-editor {
            padding: 1.25rem !important;
            border-radius: 16px !important;
            box-shadow: 0 4px 24px rgba(0,0,0,0.03) !important;
            border-color: #f1f5f9 !important;
          }

          /* Touch optimized inputs to prevent iOS zooming */
          .manage-content-input {
            font-size: 1rem !important;
            padding: 0.85rem !important;
            border-radius: 10px !important;
          }
          
          .manage-content-dropzone {
            padding: 2rem 1rem !important;
            border-radius: 12px !important;
          }

          .manage-content-save-btn {
            width: 100% !important;
            padding: 1rem !important;
            font-size: 1rem !important;
            border-radius: 12px !important;
          }
        }
      `}</style>

      <div className="manage-content-wrapper" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Site Content Management</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Update textual content and images for the public website pages.</p>

        <div className="manage-content-layout" style={{ display: 'flex', gap: '2rem' }}>

          {/* Navigation Tabs */}
          <div className="manage-content-tabs" style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['home', 'about', 'services', 'contact-info'].map(tab => (
              <button
                key={tab}
                className="manage-content-tab-btn"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '1rem',
                  textAlign: 'left',
                  border: 'none',
                  backgroundColor: activeTab === tab ? 'var(--color-primary-dark)' : '#f1f5f9',
                  color: activeTab === tab ? 'white' : '#334155',
                  borderRadius: '6px',
                  fontWeight: activeTab === tab ? '600' : '500',
                  cursor: 'pointer',
                  letterSpacing: '0.5px'
                }}
              >
                {tab.replace('-', ' ').toUpperCase()} PAGE
              </button>
            ))}
          </div>

          {/* Editor Area */}
          <div className="manage-content-editor" style={{ flex: '1', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '6px' }}>
            <h3 style={{ marginBottom: '1.5rem', textTransform: 'capitalize' }}>Editing {activeTab.replace('-', ' ')} Content</h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#475569' }}>Main Heading</label>
              <input className="manage-content-input" type="text" placeholder="Enter page heading..." style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', outlineColor: 'var(--color-primary)' }} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#475569' }}>Body Paragraph</label>
              <textarea
                className="manage-content-input"
                rows="6"
                placeholder="Enter text..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical', outlineColor: 'var(--color-primary)' }}
              ></textarea>
            </div>

            <div className="manage-content-dropzone" style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '6px', textAlign: 'center', transition: 'border-color 0.2s' }}>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '600', color: '#334155' }}>Featured Images</label>
              <input type="file" accept="image/*" style={{ maxWidth: '100%' }} />
              <p style={{ marginTop: '0.8rem', fontSize: '0.8rem', color: '#64748b' }}>Select standard formats (PNG, JPG, WebP). 2MB max.</p>
            </div>

            <button className="btn-primary manage-content-save-btn" onClick={handleSave} style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}>Save Changes</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ManageContent;