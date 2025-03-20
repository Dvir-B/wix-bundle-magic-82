
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SettingsPage from './pages/SettingsPage';

export default function Settings() {
  return (
    <Routes>
      <Route index element={<SettingsPage />} />
    </Routes>
  );
}
