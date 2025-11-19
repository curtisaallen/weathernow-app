export type WeatherIcon = { src: string; alt: string };

export function wmoToImage(code: number): WeatherIcon {
  switch (code) {
    // 0–3: Clear → Overcast
    case 0:  return { src: "/weather/icon-sunny.webp",          alt: "Clear sky" };
    case 1:  return { src: "/weather/icon-partly-cloudy.webp",  alt: "Mainly clear" };
    case 2:  return { src: "/weather/icon-partly-cloudy.webp",  alt: "Partly cloudy" };
    case 3:  return { src: "/weather/icon-overcast.webp",       alt: "Overcast" };

    // Fog
    case 45:
    case 48: return { src: "/weather/icon-fog.webp",            alt: "Fog" };

    // Drizzle
    case 51:
    case 53: return { src: "/weather/icon-drizzle.webp",        alt: "Drizzle" };
    case 55: return { src: "/weather/icon-rain.webp",           alt: "Dense drizzle" };

    // Freezing drizzle / freezing rain
    case 56:
    case 57:
    case 66:
    case 67: return { src: "/weather/icon-rain.webp",           alt: "Freezing precipitation" };

    // Rain
    case 61: return { src: "/weather/icon-drizzle.webp",        alt: "Light rain" };
    case 63:
    case 65: return { src: "/weather/icon-rain.webp",           alt: "Rain" };

    // Snow
    case 71:
    case 73:
    case 75: return { src: "/weather/icon-snow.webp",           alt: "Snow" };
    case 77: return { src: "/weather/icon-snow.webp",           alt: "Snow grains" };

    // Rain showers
    case 80: return { src: "/weather/icon-drizzle.webp",        alt: "Light showers" };
    case 81:
    case 82: return { src: "/weather/icon-rain.webp",           alt: "Showers" };

    // Snow showers
    case 85:
    case 86: return { src: "/weather/icon-snow.webp",           alt: "Snow showers" };

    // Thunderstorms
    case 95:
    case 96:
    case 99: return { src: "/weather/icon-storm.webp",          alt: "Thunderstorm" };

    default: return { src: "/weather/icon-overcast.webp",       alt: "N/A" };
  }
}
