"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { wmoToImage } from "../lib/iconMap";
import type { HourlyDay } from "../types/weather"; 

type Props = {
  stats: HourlyDay[];
};

export default function HourlyForecast({ stats }: Props) {
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const todayName = dayNames[new Date().getDay()];

  // only store the user's selection
  const [selectedDay, setSelectedDay] = useState<string>(todayName);
  const [menuOpen, setMenuOpen] = useState(false);

  // if stats update and current selection doesn't exist, fall back gracefully
  useEffect(() => {
    if (stats?.length && !stats.some(d => d.weekday === selectedDay)) {
      setSelectedDay(stats[0].weekday);
    }
  }, [stats, selectedDay]);

  // derive the data to render from props + selectedDay
  const current = useMemo(
    () => stats?.find(d => d.weekday === selectedDay),
    [stats, selectedDay]
  );

  // loading / empty guard
  if (!stats || !stats.length || !current) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  const pickDay = (day: string) => {
    setSelectedDay(day);
    setMenuOpen(false);
  };

  return (
    <aside className="rounded-xl p-6 bg-brand-deep">
      <div className="flex justify-between items-center pb-5">
        <h2 className="text-lg font-medium text-sm">Hourly forecast</h2>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(o => !o)}
            id="day-toggle"
            className="bg-brand-deep-dark text-white font-bold py-2 px-4 rounded flex items-center justify-between gap-2"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="day-menu"
          >
            <span id="day-label">{selectedDay.substring(0, 3)}</span>
          </button>

          <div
            id="day-menu"
            className={
              menuOpen
                ? "absolute z-20 mt-2 w-32 origin-top-right rounded-md bg-brand-deep p-3 text-sm shadow-lg ring-1 ring-black/10 transition"
                : "invisible absolute z-20 mt-2 w-32 origin-top-right rounded-md bg-brand-deep p-3 text-sm shadow-lg ring-1 ring-black/10 opacity-0 transition"
            }
          >
            {dayNames.map((d) => (
              <button
                key={d}
                onClick={() => pickDay(d)}
                className="dropdown-item block w-full rounded px-3 py-2 mb-2 text-left hover:bg-slate-100 hover:text-black bg-brand-deep-dark text-white"
                role="option"
              >
                {d.substring(0,3)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[600px] overflow-y-auto">
        {current.hours?.map((hour, idx) => {
          // hour.time might be string | number | Date depending on your shared type
          const timeValue =
            hour.time instanceof Date
              ? hour.time
              : new Date(hour.time as any);

          const formatted = timeValue.toLocaleTimeString([], {
            hour: "numeric",
            hour12: true,
          });

          const icon = wmoToImage(hour.code ?? 0);
          const tempDisplay =
            hour.temperature != null ? `${hour.temperature}°` : "--";

          return (
            <div
              key={idx}
              className="hour-card flex justify-between items-center p-4 mb-2 bg-brand-deep-dark text-white font-bold rounded-xl"
            >
              <div className="hourly-forecast flex gap-2">
                <Image
                  alt="Weather"
                  width={24}
                  height={24}
                  className="day-icon"
                  src={icon.src}
                />
                <div className="font-medium">{formatted}</div>
              </div>
              <div className="hourly-temp">{tempDisplay}</div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
