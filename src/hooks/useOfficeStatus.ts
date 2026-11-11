import { useState, useEffect } from 'react';

export interface OfficeStatusResult {
  isOpen: boolean;
  statusText: string;
  subText: string;
  karachiTime: string;
  dayName: string;
}

export function useOfficeStatus(): OfficeStatusResult {
  const [status, setStatus] = useState<OfficeStatusResult>({
    isOpen: false,
    statusText: 'Checking office hours...',
    subText: 'Office schedule: Mon–Sat 8:00 AM – 2:00 PM PKT',
    karachiTime: '--:--',
    dayName: '---'
  });

  useEffect(() => {
    function computeStatus() {
      try {
        const now = new Date();
        const parts = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          weekday: 'short',
          hour: '2-digit',
          minute: '2-digit',
          hourCycle: 'h23'
        }).formatToParts(now).reduce<Record<string, string>>((acc, p) => {
          acc[p.type] = p.value;
          return acc;
        }, {});

        const dayMap: Record<string, number> = {
          Mon: 1,
          Tue: 2,
          Wed: 3,
          Thu: 4,
          Fri: 5,
          Sat: 6,
          Sun: 0
        };

        const day = dayMap[parts.weekday || 'Mon'] ?? 1;
        const currentHour = parseInt(parts.hour || '0', 10);
        const currentMinute = parseInt(parts.minute || '0', 10);
        const minuteOfDay = currentHour * 60 + currentMinute;

        const opensAt = 8 * 60; // 8:00 AM
        const closesAt = 14 * 60; // 2:00 PM

        const clock = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(now);

        const isWorkingDay = day >= 1 && day <= 6; // Mon to Sat
        const isOpen = isWorkingDay && minuteOfDay >= opensAt && minuteOfDay < closesAt;

        let statusText = '';
        let subText = '';

        if (isOpen) {
          statusText = 'College Office is Open';
          const minsLeft = closesAt - minuteOfDay;
          const hoursLeft = Math.floor(minsLeft / 60);
          const remMins = minsLeft % 60;
          subText = `Closes today at 2:00 PM PKT (${hoursLeft > 0 ? `${hoursLeft}h ` : ''}${remMins}m remaining)`;
        } else {
          statusText = 'College Office is Closed';
          if (day === 0) {
            subText = 'Next listed opening: Monday at 8:00 AM (Pakistan Time)';
          } else if (day >= 1 && day <= 5 && minuteOfDay < opensAt) {
            subText = 'Opens today at 8:00 AM (Pakistan Time)';
          } else if (day >= 1 && day <= 5) {
            subText = 'Next listed opening: Tomorrow at 8:00 AM';
          } else if (day === 6 && minuteOfDay < opensAt) {
            subText = 'Opens today at 8:00 AM (Pakistan Time)';
          } else if (day === 6) {
            subText = 'Next listed opening: Monday at 8:00 AM';
          }
        }

        setStatus({
          isOpen,
          statusText,
          subText,
          karachiTime: clock,
          dayName: parts.weekday || 'Today'
        });
      } catch (err) {
        console.warn('Unable to calculate office status:', err);
      }
    }

    computeStatus();
    const interval = setInterval(computeStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
