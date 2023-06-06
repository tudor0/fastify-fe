function formatTimeAgo(timestamp: string) {
  const date = new Date(timestamp);
  const localDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const userTimezoneOffset = localDate.getTimezoneOffset() * 60000;
  const localTime = new Date(localDate.getTime() - userTimezoneOffset);

  const diffInMilliseconds = Date.now() - localTime.getTime();
  const seconds = Math.floor(diffInMilliseconds / 1000);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  // ... handle longer time periods if needed

  return localDate.toLocaleString(); // Return the formatted date in the local time zone
}

export { formatTimeAgo };
