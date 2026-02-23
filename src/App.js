import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreatorPortfolio from './pages/CreatorPortfolio';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/creators/creator_001" replace />} />
        <Route path="/creators/:creatorId" element={<CreatorPortfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
