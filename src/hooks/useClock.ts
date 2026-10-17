import { useEffect, useMemo, useState } from 'react';

/** Current HH:MM in the given IANA time zone, refreshed every 15 seconds. */
export function useClock(timeZone: string): string {
  const formatter = useMemo(
    () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }),
    [timeZone],
  );
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  return formatter.format(now);
}
