export type Days = {
  date: Date;      // or number, but PICK ONE and be consistent
  code: number;
  tMax: number;
  tMin: number;
};


// app/types/weather.ts

export type HourBlock = {
  time: string; // or string | number | Date if you really need all three
  temperature: number | null | undefined;
  feelsLike: number | null | undefined;
  humidity: number | null | undefined;
  precipitation: number | null | undefined;
  cloudCover: number | null | undefined;
  windSpeed: number | null | undefined;
  code: number | null | undefined;
};

export type HourlyDay = {
  date: string;
  weekday: string;
  hours: HourBlock[];
};


export type Stats = {
  feelsLike: string;
  humidity: string;
  wind: string;
  precip: string;
};

export type GetStats = {
  feelsLike: number;
  humidity: number;
  wind: number;
  precip: number;
};

