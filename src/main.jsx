import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Import the QueryClient and Provider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 2. Create a client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // This prevents unnecessary re-fetches when switching windows
      refetchOnWindowFocus: false, 
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. Wrap your App with the Provider and pass the client */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);