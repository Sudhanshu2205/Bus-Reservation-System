import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Import additional fonts for better typography
const loadFonts = () => {
  const link1 = document.createElement('link');
  link1.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
  link1.rel = 'stylesheet';
  document.head.appendChild(link1);

  const link2 = document.createElement('link');
  link2.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
  link2.rel = 'stylesheet';
  document.head.appendChild(link2);
};

// Load fonts before rendering
loadFonts();

// Add viewport meta tag for responsive design
const addViewportMeta = () => {
  if (!document.querySelector('meta[name="viewport"]')) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, shrink-to-fit=no';
    document.head.appendChild(meta);
  }
};

// Add theme color meta tags
const addThemeColors = () => {
  const themeColor = document.createElement('meta');
  themeColor.name = 'theme-color';
  themeColor.content = '#2563eb';
  document.head.appendChild(themeColor);

  const msColor = document.createElement('meta');
  msColor.name = 'msapplication-TileColor';
  msColor.content = '#2563eb';
  document.head.appendChild(msColor);
};

// Set up document metadata
const setupDocument = () => {
  addViewportMeta();
  addThemeColors();
  
  // Set document title if not already set
  if (document.title === '') {
    document.title = 'Bus Booking - Easy Online Bus Reservations';
  }
  
  // Add meta description for SEO
  const metaDesc = document.createElement('meta');
  metaDesc.name = 'description';
  metaDesc.content = 'Book bus tickets online with ease. Find routes, compare prices, and secure your seats instantly.';
  document.head.appendChild(metaDesc);
};

// Initialize app
const initializeApp = () => {
  setupDocument();
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Error boundary for better error handling
const handleError = (error) => {
  console.error('Application Error:', error);
  
  // You could send errors to a logging service here
  // Example: logErrorToService(error);
};

// Set up global error handlers
window.addEventListener('error', (event) => {
  handleError(event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  handleError(event.reason);
});

// Initialize the application
initializeApp();