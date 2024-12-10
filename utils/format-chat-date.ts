import moment from 'moment';

export function formatChatDate(date: string | number): string {
  const timestamp = typeof date === 'string' ? parseInt(date) : date;
  return moment(timestamp).fromNow(); // e.g., "12 hours ago", "a day ago"
}
