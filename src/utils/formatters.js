export function formatViews(num) {
  if (!num && num !== 0) return '0';
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function formatMAD(num) {
  if (!num && num !== 0) return '0 MAD';
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K MAD`;
  return `${num.toFixed(0)} MAD`;
}

export function getPlatformColor(platform) {
  const map = { TikTok: '#FE2C55', Instagram: '#C13584', YouTube: '#FF0000' };
  return map[platform] || '#aaff00';
}
