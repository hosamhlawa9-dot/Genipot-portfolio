import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreatorData } from '../hooks/useCreatorData';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatsTicker from '../components/StatsTicker';
import PerformanceStats from '../components/PerformanceStats';
import CampaignHistory from '../components/CampaignHistory';
import TopSubmissions from '../components/TopSubmissions';
import PortfolioModal from '../components/PortfolioModal';
import { CTASection, Footer } from '../components/CTAAndFooter';
import { LoadingState, ErrorState } from '../components/States';

export default function CreatorPortfolio() {
  const { creatorId } = useParams();
  const { creator, campaigns, submissions, stats, loading, error } = useCreatorData(creatorId);
  const [showModal, setShowModal] = useState(false);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar onWorkWithMe={() => setShowModal(true)} />
      <HeroSection creator={creator} onWorkWithMe={() => setShowModal(true)} />
      <StatsTicker stats={stats} campaigns={campaigns} />
      <PerformanceStats stats={stats} />
      <CampaignHistory campaigns={campaigns} submissions={submissions} />
      <TopSubmissions submissions={submissions} />
      <CTASection creatorName={creator?.name} onWorkWithMe={() => setShowModal(true)} />
      <Footer />

      {/* Portfolio creation modal */}
      {showModal && <PortfolioModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
