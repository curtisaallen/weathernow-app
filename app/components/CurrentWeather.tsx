"use client";
import React from 'react'
import Image from "next/image";
import { wmoToImage } from "../lib/iconMap";
type CurrentWeatherProps = {
  city: string;
  country: string;
  dateStr: string;
  tempC: string | null;      
  iconSrc: string | number | null;
};
export default function CurrentWeather({
  city,
  country,
  dateStr,
  tempC,
  iconSrc,
}: CurrentWeatherProps) {
       let icon: { src: string; alt: string } | null = null;

       if (iconSrc != null) {
       const code =
       typeof iconSrc === "string" ? Number(iconSrc) : iconSrc; 
       icon = wmoToImage(code); 
       }
    return (
      <div className="rounded-xl p-[2.5rem] bg-panel current-weather text-left">
             <h2 className="text-4xl font-semibold mb-3">{city}, {country}</h2>
             <p>{dateStr}</p>
             <div className="flex w-full items-center justify-center gap-4">
              {icon && (
              <Image src={icon.src} alt={icon.alt} width={160} height={160} className="size-40"   />
              )}
                 <span className="text-6xl">{tempC}°</span>
            </div>
     </div>
    )
}

