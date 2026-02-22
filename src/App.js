import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreatorPortfolio from './pages/CreatorPortfolio';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect to demo creator */}
        <Route path="/" element={<Navigate to="/creators/creator_001" replace />} />
        {/* Dynamic creator route */}
        <Route path="/creators/:creatorId" element={<CreatorPortfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
