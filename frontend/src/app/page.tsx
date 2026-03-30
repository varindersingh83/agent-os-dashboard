import React from 'react';
import Link from 'next/link';

export default function Page() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      color: 'white', 
      fontFamily: 'sans-serif',
      textAlign: 'center' 
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Agent OS</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>The Intelligent Organization OS</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/dashboard" style={{ 
          padding: '0.75rem 1.5rem', 
          backgroundColor: '#2563eb', 
          color: 'white', 
          borderRadius: '0.5rem', 
          textDecoration: 'none' 
        }}>
          Open Dashboard
        </Link>
      </div>
    </div>
  );
}
