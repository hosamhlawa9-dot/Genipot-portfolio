import { useState, useEffect } from 'react';

/**
 * Custom hook that fetches all creator data from mock JSON files
 * and computes derived performance stats from submissions.
 *
 * Architecture decision: All stat computation lives here, not in components.
 * This keeps components purely presentational and makes logic testable.
 */
export function useCreatorData(creatorId) {
  const [creator, setCreator] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!creatorId) return;

    // Check localStorage cache first (bonus feature)
    const cacheKey = `geniepot_${creatorId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        // Cache valid for 5 minutes
        if (Date.now() - timestamp < 5 * 60 * 1000) {
          setCreator(data.creator);
          setCampaigns(data.campaigns);
          setSubmissions(data.submissions);
          setStats(computeStats(data.submissions));
          setLoading(false);
          return;
        }
      } catch (_) {}
    }

    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API calls using fetch to /mock/*.json
        const [creatorRes, campaignsRes, submissionsRes] = await Promise.all([
          fetch(`/mock/creators.${creatorId}.json`),
          fetch(`/mock/campaigns.${creatorId}.json`),
          fetch(`/mock/submissions.${creatorId}.json`),
        ]);

        if (!creatorRes.ok) throw new Error(`Creator not found (${creatorRes.status})`);
        if (!campaignsRes.ok) throw new Error(`Campaigns not found (${campaignsRes.status})`);
        if (!submissionsRes.ok) throw new Error(`Submissions not found (${submissionsRes.status})`);

        const [creatorData, campaignsData, submissionsData] = await Promise.all([
          creatorRes.json(),
          campaignsRes.json(),
          submissionsRes.json(),
        ]);

        // Cache in localStorage
        localStorage.setItem(cacheKey, JSON.stringify({
          data: { creator: creatorData, campaigns: campaignsData, submissions: submissionsData },
          timestamp: Date.now(),
        }));

        setCreator(creatorData);
        setCampaigns(campaignsData);
        setSubmissions(submissionsData);
        setStats(computeStats(submissionsData));
      } catch (err) {
        setError(err.message || 'Failed to load creator data');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [creatorId]);

  return { creator, campaigns, submissions, stats, loading, error };
}

/**
 * Computes all derived performance stats from submissions array.
 * Stats are NEVER hardcoded — always derived from raw data.
 */
function computeStats(submissions) {
  if (!submissions || submissions.length === 0) {
    return {
      totalSubmissions: 0,
      totalViews: 0,
      totalEarnings: 0,
      avgViewsPerSubmission: 0,
      bestPlatform: 'N/A',
      platformBreakdown: {},
    };
  }

  const totalSubmissions = submissions.length;
  const totalViews = submissions.reduce((sum, s) => sum + s.views, 0);
  const totalEarnings = submissions.reduce((sum, s) => sum + s.earnings, 0);
  const avgViewsPerSubmission = Math.round(totalViews / totalSubmissions);

  // Best performing platform by total views
  const platformViews = submissions.reduce((acc, s) => {
    acc[s.platform] = (acc[s.platform] || 0) + s.views;
    return acc;
  }, {});

  const bestPlatform = Object.entries(platformViews).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return {
    totalSubmissions,
    totalViews,
    totalEarnings,
    avgViewsPerSubmission,
    bestPlatform,
    platformBreakdown: platformViews,
  };
}
