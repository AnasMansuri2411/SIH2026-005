/**
 * Format currency to Indian Rupees notation (Lakhs and Crores)
 */
export function formatINR(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr.toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹${lakh.toFixed(2)} Lakh`;
  } else {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
}

/**
 * Format date to technical investigative format
 */
export function formatDateTime(isoString: string): string {
  if (!isoString) return 'N/A';
  try {
    const d = new Date(isoString);
    return d.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  } catch {
    return isoString;
  }
}

/**
 * Format relative time
 */
export function formatRelativeTime(isoString: string): string {
  if (!isoString) return 'N/A';
  try {
    const d = new Date(isoString);
    const now = new Date('2026-09-08T02:30:00Z');
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${Math.max(1, diffMins)}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  } catch {
    return isoString;
  }
}

/**
 * Truncate long hash strings
 */
export function truncateHash(hash: string, start = 8, end = 6): string {
  if (!hash || hash.length <= start + end) return hash;
  return `${hash.substring(0, start)}...${hash.substring(hash.length - end)}`;
}
