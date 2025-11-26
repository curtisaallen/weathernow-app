export type HourRow = {
  time: string | number | Date;
  temperature: number | null | undefined;
  code: number | null | undefined;
};

export type HourlyDay = {
  date: string;
  weekday: string;
  hours: HourRow[];
};
