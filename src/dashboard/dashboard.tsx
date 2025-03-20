
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BundlesDashboard from './pages/BundlesDashboard';
import CreateBundle from './pages/CreateBundle';

const queryClient = new QueryClient();

export default function Dashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<BundlesDashboard />} />
        <Route path="/create-bundle" element={<CreateBundle />} />
      </Routes>
    </QueryClientProvider>
  );
}
