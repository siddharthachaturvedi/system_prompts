export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    // Add 5 minute buffer to refresh before actual expiration
    return payload.exp < (currentTime + 300);
  } catch {
    return true; // If we can't parse, assume expired
  }
};

export const getTokenExpirationTime = (token: string): Date | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return new Date(payload.exp * 1000);
  } catch {
    return null;
  }
};

export const shouldRefreshToken = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    const timeUntilExpiry = payload.exp - currentTime;
    // Refresh if token expires within 10 minutes
    return timeUntilExpiry < 600;
  } catch {
    return true;
  }
};