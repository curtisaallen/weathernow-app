"use client";
import React from 'react'

type Stats = {
    feelsLike: string;
    humidity: string;
    wind: string;
    precip: string;
}

type Props = {
    stats: Stats;
}

export default function GetWeatherStats({ stats }: Props) {
    return (
                <div className="weather-stats py-5 flex flex-wrap justify-between gap-2">
                    <div className="w-full lg:flex-1 rounded-xl p-6 bg-brand-deep">
                        <p className="text-sm text-neutral-300 mb-3 font-light">Feels Like </p>
                        <p className="text-[2rem] font-semibold">{stats.feelsLike}°</p>
                     </div>
                    <div className="w-full lg:flex-1 rounded-xl p-6 bg-brand-deep">
                        <p className="text-sm text-neutral-300 mb-3 font-light">Humidity </p>
                        <p className="text-[2rem] font-semibold">{stats.humidity}°</p>
                    </div>
                    <div className="w-full lg:flex-1 rounded-xl p-6 bg-brand-deep">
                        <p className="text-sm text-neutral-300 mb-3 font-light">Wind </p>
                        <p className="text-[2rem] font-semibold">{stats.wind}°</p>
                     </div>
                    <div className="w-full lg:flex-1 rounded-xl p-6 bg-brand-deep">
                        <p className="text-sm text-neutral-300 mb-3 font-light">Precipitation </p>
                        <p className="text-[2rem] font-semibold">{stats.precip}°</p>
                    </div>                    
                </div>
    )
}
