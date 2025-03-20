
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SettingsPage from './pages/SettingsPage';

// Create a unique query client for the settings module
const queryClient = new QueryClient();

export default function Settings() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<SettingsPage />} />
      </Routes>
    </QueryClientProvider>
  );
}
