import { MbscEventcalendarView } from "@mobiscroll/react";

type ScheduleTypes = keyof Pick<MbscEventcalendarView, 'schedule' | 'timeline'>;

export type { ScheduleTypes };