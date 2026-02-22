/**
 * Utility: format large numbers to readable form (1.2M, 450K, etc.)
 */
export function formatViews(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toString();
}

/**
 * Utility: format MAD currency
 */
export function formatMAD(num) {
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K MAD`;
  return `${num} MAD`;
}

/**
 * Utility: platform color mapping
 */
export function getPlatformColor(platform) {
  const map = {
    TikTok: '#ff0050',
    Instagram: '#c13584',
    YouTube: '#ff0000',
  };
  return map[platform] || '#aaff00';
}

/**
 * Utility: platform icon (Material Symbol name)
 */
export function getPlatformIcon(platform) {
  const map = {
    TikTok: 'music_video',
    Instagram: 'photo_camera',
    YouTube: 'play_circle',
  };
  return map[platform] || 'public';
}
