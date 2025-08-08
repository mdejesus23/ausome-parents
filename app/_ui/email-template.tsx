import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333',
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fafafa',
      }}
    >
      <h2 style={{ color: '#2c3e50' }}>📩 New Contact Form Submission</h2>

      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>

      <div style={{ marginTop: '20px' }}>
        <strong>Message:</strong>
        <p
          style={{
            backgroundColor: '#fff',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            whiteSpace: 'pre-line',
          }}
        >
          {message}
        </p>
      </div>

      <hr style={{ margin: '30px 0' }} />

      <footer style={{ fontSize: '0.9em', color: '#888' }}>
        This message was sent from the contact form on your website.
      </footer>
    </div>
  );
}
