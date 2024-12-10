export const formatter = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

export const dateOnlyFormatter = (date?: Date, separator = '-') => {
  if (!date) return;

  const formatter = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return formatter.format(date).split('/').join(separator);
};

export const dateTimeFormatterWithouTLocale = (
  date: Date,
  withTime: boolean = false,
  separator = '/'
) => {
  if (withTime) {
    return date.toISOString().replace(/-/g, separator).replace('T', ' ').substring(0, 19);
  }
  return date.toISOString().replace(/-/g, separator).substring(0, 10);
};

export const dateTimestampFormatter = (date: string) =>
  new Date(+date).toLocaleString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const mFormatted = m > 9 ? m : '0' + m;
  const dFormatted = d > 9 ? d : '0' + d;
  return `${y}-${mFormatted}-${dFormatted}`;
}
