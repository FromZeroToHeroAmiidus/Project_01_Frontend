import { refreshTokens } from "./Api";

// Refresh token every 14 minutes and 55 seconds (14 * 60 + 55) * 1000 ms
const REFRESH_INTERVAL = (14 * 60 + 55) * 1000;

export function startTokenRefreshInterval() {
  setInterval(async () => {
    const success = await refreshTokens();
    if (success) {
      console.log("Access token refreshed successfully");
    } else {
      console.error("Failed to refresh access token");
    }
  }, REFRESH_INTERVAL);
}
