"use client";
import React, { Component } from 'react'
import Image from "next/image";
import { wmoToImage } from "../lib/iconMap";

function weekdayName(dateInput, timeZone = "America/New_York") {
  const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone,
  }).format(d); // e.g., "Monday"
}

export default function DailyForecast({ day, tempmax = 15, tempmin = 6 }) {
    const label = weekdayName(day.date,"America/New_York");
    const icon = wmoToImage(day.code);
    return (
                     <div className="flex-1 basis-0 min-w-0 rounded-xl px-2 py-6 bg-brand-deep grid place-items-center">
                        <p className="text-sm text-neutral-300 mb-3 font-light">
                            {label}
                        </p>
                        <Image
                        alt={icon.alt}
                        width={46}
                        height={46}
                        className="day-icon"
                        src={icon.src}
                        />
                        <div className="flex justify-between gap-2">
                                <p className="text-sm mb-3 font-bold">{day.tMax}°</p>
                                <p className="text-sm text-neutral-300 mb-3 font-light">{day.tMin}°</p>
                            </div>
                        </div>
    )
}
