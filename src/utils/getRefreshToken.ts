export function getRefreshToken() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user?.refresh_token || "";
}
