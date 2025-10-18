// Amazon Listing Optimizer - Main Application Component
import React, { useState } from 'react'
import OptimizeForm from './components/OptimizeForm.jsx'
import ResultView from './components/ResultView.jsx'
import History from './components/History.jsx'

export default function App() {
  const [optimizationResult, setOptimizationResult] = useState(null)

  const appContainerStyles = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    width: '100%',
    boxSizing: 'border-box'
  }

  const contentWrapperStyles = {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '32px',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    minHeight: 'calc(100vh - 40px)',
    boxSizing: 'border-box'
  }

  const headerStyles = {
    textAlign: 'center',
    marginBottom: '32px',
    color: 'white',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
  }

  const titleStyles = {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '800',
    marginBottom: '12px',
    background: 'linear-gradient(45deg, #fff, #f0f8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  }

  const subtitleStyles = {
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    opacity: '0.9',
    fontWeight: '300'
  }

  const dividerStyles = {
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    border: 'none',
    margin: '40px 0',
    borderRadius: '1px'
  }

  return (
    <div style={appContainerStyles}>
      <div style={contentWrapperStyles}>
        <header style={headerStyles}>
          <h1 style={titleStyles}>
            🚀 Amazon Listing Optimizer
          </h1>
          <p style={subtitleStyles}>
            Transform your Amazon product listings with AI-powered optimization
          </p>
        </header>
        
        <OptimizeForm onResult={setOptimizationResult} />
        {optimizationResult && <ResultView data={optimizationResult} />}
        <hr style={dividerStyles} />
        <History />
      </div>
    </div>
  )
}
