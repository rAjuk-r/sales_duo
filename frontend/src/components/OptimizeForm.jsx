// OptimizeForm Component - Handles ASIN input and optimization requests
import React, { useState } from 'react'

export default function OptimizeForm({ onResult }) {
  const [asin, setAsin] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_BASE_URL = 'http://localhost:8080'
  const OPTIMIZE_ENDPOINT = `${API_BASE_URL}/api/optimize`

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    
    try {
      const response = await fetch(OPTIMIZE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asin }),
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Optimization failed')
      }
      
      onResult(result)
      
    } catch (err) {
      console.error('Optimization error:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const formContainerStyles = {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)'
  }

  const inputGroupStyles = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }

  const labelStyles = {
    fontSize: '1.1em',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '8px',
    display: 'block'
  }

  const inputStyles = {
    padding: '12px 16px',
    fontSize: '1em',
    border: '2px solid #e1e8ed',
    borderRadius: '8px',
    minWidth: '200px',
    transition: 'all 0.3s ease',
    outline: 'none',
    background: 'white',
    color: '#333'
  }

  const buttonStyles = {
    padding: '12px 24px',
    fontSize: '1em',
    fontWeight: '600',
    background: isLoading ? '#95a5a6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    minWidth: '140px'
  }

  const errorMessageStyles = {
    background: '#ffebee',
    color: '#c62828',
    padding: '12px 16px',
    borderRadius: '8px',
    marginTop: '16px',
    border: '1px solid #ffcdd2',
    fontSize: '0.95em',
    textAlign: 'center'
  }

  const successMessageStyles = {
    background: '#e8f5e8',
    color: '#2e7d32',
    padding: '12px 16px',
    borderRadius: '8px',
    marginTop: '16px',
    border: '1px solid #c8e6c9',
    fontSize: '0.95em',
    textAlign: 'center'
  }

  const handleInputFocus = (e) => {
    e.target.style.borderColor = '#667eea'
    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
  }

  const handleInputBlur = (e) => {
    e.target.style.borderColor = '#e1e8ed'
    e.target.style.boxShadow = 'none'
  }

  const handleButtonHover = (e) => {
    if (!isLoading && asin.trim()) {
      e.target.style.transform = 'translateY(-2px)'
      e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)'
    }
  }

  const handleButtonLeave = (e) => {
    if (!isLoading && asin.trim()) {
      e.target.style.transform = 'translateY(0)'
      e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)'
    }
  }

  return (
    <div style={formContainerStyles}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '24px', 
        color: '#2c3e50',
        fontSize: '1.8em',
        fontWeight: '700'
      }}>
        🎯 Amazon Listing Optimizer
      </h2>
      
      <form onSubmit={handleFormSubmit}>
        <label style={labelStyles}>
          Enter Amazon ASIN:
        </label>
        
        <div style={inputGroupStyles}>
          <input 
            value={asin} 
            onChange={(e) => setAsin(e.target.value)} 
            placeholder="B07XJ8C8F5" 
            style={inputStyles}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            disabled={isLoading}
            aria-label="Amazon ASIN input"
          />
          
          <button 
            type="submit" 
            disabled={isLoading || !asin.trim()} 
            style={buttonStyles}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            aria-label="Optimize Amazon listing"
          >
            {isLoading ? (
              <>
                <span style={{ marginRight: '8px' }}>⏳</span>
                Optimizing...
              </>
            ) : (
              <>
                <span style={{ marginRight: '8px' }}>🚀</span>
                Optimize Listing
              </>
            )}
          </button>
        </div>
        
        {error && (
          <div style={errorMessageStyles} role="alert">
            <span style={{ marginRight: '8px' }}>❌</span>
            {error}
          </div>
        )}
        
        {!error && !isLoading && asin && (
          <div style={successMessageStyles}>
            <span style={{ marginRight: '8px' }}>✅</span>
            Ready to optimize ASIN: {asin}
          </div>
        )}
      </form>
    </div>
  )
}
