import { useState, useEffect } from 'react';

export function useCreatorData(creatorId) {
  const [creator, setCreator] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!creatorId) return;

    // localStorage cache (5 min TTL)
    const cacheKey = `geniepot_${creatorId}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < 5 * 60 * 1000) {
          setCreator(data.creator);
          setCampaigns(data.campaigns);
          setSubmissions(data.submissions);
          setStats(computeStats(data.submissions));
          setLoading(false);
          return;
        }
      }
    } catch (_) {}

    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const [cRes, campRes, subRes] = await Promise.all([
          fetch(`/mock/creators.${creatorId}.json`),
          fetch(`/mock/campaigns.${creatorId}.json`),
          fetch(`/mock/submissions.${creatorId}.json`),
        ]);

        if (!cRes.ok) throw new Error('Creator not found');
        if (!campRes.ok) throw new Error('Campaigns not found');
        if (!subRes.ok) throw new Error('Submissions not found');

        const [creatorData, campaignsData, submissionsData] = await Promise.all([
          cRes.json(), campRes.json(), subRes.json(),
        ]);

        localStorage.setItem(cacheKey, JSON.stringify({
          data: { creator: creatorData, campaigns: campaignsData, submissions: submissionsData },
          timestamp: Date.now(),
        }));

        setCreator(creatorData);
        setCampaigns(campaignsData);
        setSubmissions(submissionsData);
        setStats(computeStats(submissionsData));
      } catch (err) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [creatorId]);

  return { creator, campaigns, submissions, stats, loading, error };
}

// All stats computed from real JSON — never hardcoded
function computeStats(submissions) {
  if (!submissions?.length) return {
    totalSubmissions: 0, totalViews: 0, totalEarnings: 0,
    avgViews: 0, bestPlatform: 'N/A', platformBreakdown: {},
    validated: 0, pending: 0, totalLikes: 0, totalComments: 0, totalShares: 0,
  };

  const totalSubmissions = submissions.length;
  const totalViews = submissions.reduce((s, x) => s + x.views, 0);
  const totalEarnings = submissions.reduce((s, x) => s + x.earning_mad, 0); // real field name
  const avgViews = Math.round(totalViews / totalSubmissions);
  const validated = submissions.filter(x => x.status === 'validated').length;
  const pending = submissions.filter(x => x.status === 'pending').length;
  const totalLikes = submissions.reduce((s, x) => s + x.likes, 0);
  const totalComments = submissions.reduce((s, x) => s + x.comments, 0);
  const totalShares = submissions.reduce((s, x) => s + x.shares, 0);

  const platformBreakdown = submissions.reduce((acc, x) => {
    acc[x.platform] = (acc[x.platform] || 0) + x.views;
    return acc;
  }, {});

  const bestPlatform = Object.entries(platformBreakdown)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return {
    totalSubmissions, totalViews, totalEarnings, avgViews,
    bestPlatform, platformBreakdown,
    validated, pending,
    totalLikes, totalComments, totalShares,
  };
}
