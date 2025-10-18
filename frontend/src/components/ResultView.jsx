import React from 'react'

export default function ResultView({ data }) {
  const { fetched, optimized } = data
  
  const cardStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    padding: '24px',
    margin: '20px 0',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    color: 'white'
  }

  const sectionStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px 0',
    color: '#333',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
  }

  const titleStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#2c3e50',
    borderBottom: '2px solid #3498db',
    paddingBottom: '8px'
  }

  const bulletStyle = {
    background: '#f8f9fa',
    padding: '8px 12px',
    margin: '6px 0',
    borderRadius: '6px',
    borderLeft: '4px solid #3498db',
    fontSize: '0.95em',
    lineHeight: '1.4'
  }

  const keywordStyle = {
    display: 'inline-block',
    background: '#e3f2fd',
    color: '#1976d2',
    padding: '4px 12px',
    margin: '4px 6px 4px 0',
    borderRadius: '20px',
    fontSize: '0.85em',
    fontWeight: '500',
    border: '1px solid #bbdefb'
  }

  const descriptionStyle = {
    background: '#f5f5f5',
    padding: '12px',
    borderRadius: '6px',
    lineHeight: '1.6',
    fontSize: '0.95em',
    border: '1px solid #e0e0e0'
  }

  return (
    <div style={cardStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '1.8em', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
        🚀 Optimization Results
      </h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', width: '100%' }}>
        {/* Original Section */}
        <div style={{ ...sectionStyle, flex: '1', minWidth: '300px', width: '100%' }}>
          <h3 style={titleStyle}>📋 Original Listing</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <strong style={{ color: '#e74c3c', fontSize: '0.9em' }}>TITLE:</strong>
            <p style={{ margin: '8px 0', fontSize: '1.1em', fontWeight: '500' }}>{fetched.title}</p>
          </div>

          {fetched.bullets && fetched.bullets.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <strong style={{ color: '#e74c3c', fontSize: '0.9em' }}>KEY FEATURES:</strong>
              <div style={{ marginTop: '8px' }}>
                {fetched.bullets.map((bullet, i) => (
                  <div key={i} style={bulletStyle}>
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
          )}

          {fetched.description && (
            <div>
              <strong style={{ color: '#e74c3c', fontSize: '0.9em' }}>DESCRIPTION:</strong>
              <div style={descriptionStyle}>
                {fetched.description}
              </div>
            </div>
          )}
        </div>

        {/* Optimized Section */}
        <div style={{ ...sectionStyle, flex: '1', minWidth: '300px', width: '100%' }}>
          <h3 style={titleStyle}>✨ Optimized Listing</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <strong style={{ color: '#27ae60', fontSize: '0.9em' }}>TITLE:</strong>
            <p style={{ margin: '8px 0', fontSize: '1.1em', fontWeight: '500', color: '#27ae60' }}>{optimized.title}</p>
          </div>

          {optimized.bullets && optimized.bullets.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <strong style={{ color: '#27ae60', fontSize: '0.9em' }}>KEY FEATURES:</strong>
              <div style={{ marginTop: '8px' }}>
                {optimized.bullets.map((bullet, i) => (
                  <div key={i} style={{...bulletStyle, borderLeft: '4px solid #27ae60'}}>
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
          )}

          {optimized.description && (
            <div style={{ marginBottom: '16px' }}>
              <strong style={{ color: '#27ae60', fontSize: '0.9em' }}>DESCRIPTION:</strong>
              <div style={{...descriptionStyle, border: '1px solid #d5f4e6'}}>
                {optimized.description}
              </div>
            </div>
          )}

          {optimized.keywords && optimized.keywords.length > 0 && (
            <div>
              <strong style={{ color: '#27ae60', fontSize: '0.9em' }}>SUGGESTED KEYWORDS:</strong>
              <div style={{ marginTop: '8px' }}>
                {optimized.keywords.map((keyword, i) => (
                  <span key={i} style={keywordStyle}>
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
