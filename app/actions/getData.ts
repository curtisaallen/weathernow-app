'use server';

export async function getWeatherData(city = "Atlanta") {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&countryCode=US&count=1&language=en`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data)
      return data;
    }


export async function getWeatherFor(city = "Atlanta", countryCode = "US") {
  // 1) Geocode → lat/lon
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&countryCode=${countryCode}&count=1&language=en`;

  const geoRes = await fetch(geoUrl, { cache: "no-store" });
  const geoData = await geoRes.json();
  const place = geoData?.results?.[0];
  if (!place) throw new Error("Location not found");

  const { name, country, latitude, longitude, timezone } = place;

  // 2) Weather → current temp + code
  const wxUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=${encodeURIComponent(
    timezone || "auto"
  )}`;
  const wxRes = await fetch(wxUrl, { cache: "no-store" });
  const wxData = await wxRes.json();

  const tempC = wxData?.current?.temperature_2m ?? null;
  const code = wxData?.current?.weather_code ?? null;


  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return { city: name, country, dateStr, tempC, code};
}



export async function getDailyForecast(lat  = 33.749, lon  =84.388, tz = "auto", days = 7) {
  const dailyFields = [
    "weathercode",
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_sum",
    "windspeed_10m_max",
    "uv_index_max",
    "sunrise",
    "sunset",
  ].join(",");

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&daily=${dailyFields}` +
    `&timezone=${encodeURIComponent(tz)}` +
    `&forecast_days=${days}`+
    `&weather_code`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data; // { daily: { time:[], temperature_2m_max:[], ... } }
}


export async function getWeatherStats(lat = 33.749, lon = -84.388, tz = "America/New_York") {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
              `&current=apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation` +
              `&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm` +
              `&timezone=${encodeURIComponent(tz)}`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  const c = data.current;
  return {
    feelsLike: Math.round(c.apparent_temperature),
    humidity: Math.round(c.relative_humidity_2m),
    wind: Math.round(c.wind_speed_10m),
    precip: c.precipitation, // mm (can be 0)
  };
}


export async function getHourlyByDayFromCoords(
  lat = 33.749,
  lon = -84.388,
  forecastDays = 7
) {
  const hourlyVars =
    "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,cloud_cover,wind_speed_10m,weather_code";

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=${hourlyVars}&timezone=auto&forecast_days=${forecastDays}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Forecast fetch failed");

  const { hourly, timezone } = await res.json();

  const rows = hourly.time.map((t, i) => ({
    time: t,
    temperature: hourly.temperature_2m?.[i],
    feelsLike: hourly.apparent_temperature?.[i],
    humidity: hourly.relative_humidity_2m?.[i],
    precipitation: hourly.precipitation?.[i],
    cloudCover: hourly.cloud_cover?.[i],
    windSpeed: hourly.wind_speed_10m?.[i],
    code: hourly.weather_code?.[i],
  }));

  const byDay = rows.reduce(
    (a, r) => ((a[r.time.slice(0, 10)] ||= []).push(r), a),
    {}
  );

  return Object.entries(byDay).map(([date, hours]) => ({
    date,
    weekday: new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: timezone || "UTC",
    }),
    hours,
  }));
}
