export function formatGameTime(dateString?: string): string {
  if (!dateString) return '-';

  try {
    const date = new Date(dateString);

    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (!isToday) {
      const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
      return `${weekday} ${time}`;
    }

    return time;
  } catch {
    return '-';
  }
}
