import React, { useState } from 'react';

const ManageContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [content, setContent] = useState('');
  
  const handleSave = () => {
    alert(`Saved changes for ${activeTab}. Content changes will be pushed to the DB in final production.`);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}>
      <h2 style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>Site Content Management</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Update textual content and images for the public website pages.</p>

      <div style={{ display: 'flex', gap: '2rem' }}>
        
        {/* Navigation Tabs */}
        <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {['home', 'about', 'services', 'contact-info'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ 
                padding: '1rem', 
                textAlign: 'left', 
                border: 'none', 
                backgroundColor: activeTab === tab ? 'var(--color-primary-dark)' : '#f1f5f9',
                color: activeTab === tab ? 'white' : '#334155',
                borderRadius: '6px',
                fontWeight: activeTab === tab ? '600' : '400',
                cursor: 'pointer'
              }}
            >
              {tab.replace('-', ' ').toUpperCase()} PAGE
            </button>
          ))}
        </div>

        {/* Editor Area */}
        <div style={{ flex: '1', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '6px' }}>
          <h3 style={{ marginBottom: '1.5rem', textTransform: 'capitalize' }}>Editing {activeTab.replace('-', ' ')} Content</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Main Heading</label>
            <input type="text" placeholder="Enter page heading..." style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Body Paragraph</label>
            <textarea 
              rows="6" 
              placeholder="Enter text..." 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
            ></textarea>
          </div>

          <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '6px', textAlign: 'center' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Featured Images</label>
            <input type="file" accept="image/*" />
            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>Select standard formats (PNG, JPG, WebP). 2MB max.</p>
          </div>

          <button className="btn-primary" onClick={handleSave}>Save Changes</button>
        </div>

      </div>
    </div>
  );
};

export default ManageContent;
