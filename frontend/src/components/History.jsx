import React, { useState } from 'react'

export default function History() {
  const [asin, setAsin] = useState('')
  const [rows, setRows] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchHistory = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:8080/api/optimize/history/${asin}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch history')
      setRows(data)
    } catch (err) {
      setError(err.message)
      setRows(null)
    } finally {
      setLoading(false)
    }
  }

  const containerStyle = {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    borderRadius: '16px',
    padding: '24px',
    marginTop: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }

  const formStyle = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '24px'
  }

  const inputStyle = {
    padding: '10px 16px',
    fontSize: '1em',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    minWidth: '200px',
    transition: 'all 0.3s ease',
    outline: 'none',
    background: 'white',
    color: '#333'
  }

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1em',
    fontWeight: '600',
    background: loading ? '#6c757d' : 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
  }

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    margin: '16px 0',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e9ecef',
    transition: 'all 0.3s ease'
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '2px solid #e9ecef'
  }

  const asinStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: '#495057',
    background: '#f8f9fa',
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #dee2e6'
  }

  const dateStyle = {
    fontSize: '0.9em',
    color: '#6c757d',
    fontStyle: 'italic'
  }

  const comparisonStyle = {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    width: '100%'
  }

  const sectionStyle = {
    flex: '1',
    minWidth: '250px'
  }

  const titleStyle = {
    fontSize: '1.1em',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#495057',
    borderBottom: '1px solid #dee2e6',
    paddingBottom: '4px'
  }

  const contentStyle = {
    fontSize: '0.95em',
    lineHeight: '1.5',
    color: '#6c757d'
  }

  const originalStyle = {
    ...contentStyle,
    color: '#dc3545'
  }

  const optimizedStyle = {
    ...contentStyle,
    color: '#28a745'
  }

  const noDataStyle = {
    textAlign: 'center',
    padding: '40px',
    color: '#6c757d',
    fontSize: '1.1em',
    background: 'white',
    borderRadius: '12px',
    border: '2px dashed #dee2e6'
  }

  const errorStyle = {
    background: '#f8d7da',
    color: '#721c24',
    padding: '12px 16px',
    borderRadius: '8px',
    marginTop: '16px',
    border: '1px solid #f5c6cb',
    textAlign: 'center'
  }

  return (
    <div style={containerStyle}>
      <h3 style={{ 
        textAlign: 'center', 
        marginBottom: '24px', 
        color: '#495057',
        fontSize: '1.6em',
        fontWeight: '700'
      }}>
        📚 Optimization History
      </h3>
      
      <form onSubmit={fetchHistory} style={formStyle}>
        <input 
          placeholder="Enter ASIN (e.g., B07XJ8C8F5)" 
          value={asin} 
          onChange={e => setAsin(e.target.value)}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = '#28a745'
            e.target.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#dee2e6'
            e.target.style.boxShadow = 'none'
          }}
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={loading || !asin.trim()}
          style={buttonStyle}
          onMouseEnter={(e) => {
            if (!loading && asin.trim()) {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)'
            }
          }}
          onMouseLeave={(e) => {
            if (!loading && asin.trim()) {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)'
            }
          }}
        >
          {loading ? (
            <>
              <span style={{ marginRight: '8px' }}>⏳</span>
              Loading...
            </>
          ) : (
            <>
              <span style={{ marginRight: '8px' }}>🔍</span>
              Get History
            </>
          )}
        </button>
      </form>

      {error && (
        <div style={errorStyle}>
          <span style={{ marginRight: '8px' }}>❌</span>
          {error}
        </div>
      )}

      {rows && rows.length === 0 && (
        <div style={noDataStyle}>
          <span style={{ fontSize: '2em', marginBottom: '16px', display: 'block' }}>📭</span>
          No optimization history found for ASIN: <strong>{asin}</strong>
        </div>
      )}

      {rows && rows.map(r => (
        <div 
          key={r.id} 
          style={cardStyle}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={headerStyle}>
            <div style={asinStyle}>
              ASIN: {r.asin}
            </div>
            <div style={dateStyle}>
              {new Date(r.created_at).toLocaleString()}
            </div>
          </div>
          
          <div style={comparisonStyle}>
            <div style={sectionStyle}>
              <div style={titleStyle}>📋 Original Title</div>
              <div style={originalStyle}>{r.fetched.title}</div>
            </div>
            <div style={sectionStyle}>
              <div style={titleStyle}>✨ Optimized Title</div>
              <div style={optimizedStyle}>{r.optimized.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
