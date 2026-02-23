import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreatorData } from '../hooks/useCreatorData';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatsTicker from '../components/StatsTicker';
import PerformanceStats from '../components/PerformanceStats';
import CampaignHistory from '../components/CampaignHistory';
import TopSubmissions from '../components/TopSubmissions';
import { CTASection, Footer } from '../components/CTAAndFooter';
import { LoadingState, ErrorState } from '../components/States';
import PortfolioModal from '../components/PortfolioModal';

export default function CreatorPortfolio() {
  const { creatorId } = useParams();
  const { creator, campaigns, submissions, stats, loading, error } = useCreatorData(creatorId);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      <Navbar
        onWorkWithMe={() => {}}
        onLogin={() => setModalOpen(true)}
      />
      <HeroSection creator={creator} onWorkWithMe={() => {}} />
      <StatsTicker stats={stats} campaigns={campaigns} />
      <PerformanceStats stats={stats} />
      <CampaignHistory campaigns={campaigns} submissions={submissions} />
      <TopSubmissions submissions={submissions} />
      <CTASection creatorName={creator?.name} onWorkWithMe={() => {}} />
      <Footer />

      <PortfolioModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
