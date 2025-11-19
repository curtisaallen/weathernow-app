"use client";
import React, { Component } from 'react'
import Image from "next/image";
import { wmoToImage } from "../lib/iconMap";

export default function CurrentWeather({ city, country, dateStr, tempC, iconSrc }) {
    //const iconClass = wmoToWi(iconSrc);
    const icon = wmoToImage(iconSrc);
    return (
      <div className="rounded-xl p-[2.5rem] bg-panel current-weather text-left">
             <h2 className="text-4xl font-semibold mb-3">{city}, {country}</h2>
             <p>{dateStr}</p>
             <div className="flex w-full items-center justify-center gap-4">
      <Image src={icon.src} alt={icon.alt} width={160} height={160} className="size-40"   />
                 <span className="text-6xl">{tempC}°</span>
            </div>
     </div>
    )
}

