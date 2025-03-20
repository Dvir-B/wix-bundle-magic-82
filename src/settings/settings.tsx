
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SettingsPage from './pages/SettingsPage';
import { useWixSettings } from '@wix/sdk';

// Create a unique query client for the settings module
const queryClient = new QueryClient();

export default function Settings() {
  // שימוש ב-hook של Wix כדי לקבל את הגדרות האפליקציה
  const { settings, loading } = useWixSettings();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-wixBlue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>טוען הגדרות...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<SettingsPage initialSettings={settings} />} />
      </Routes>
    </QueryClientProvider>
  );
}
