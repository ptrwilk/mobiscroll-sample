import { MbscEventcalendarView } from "@mobiscroll/react-next";

type ScheduleTypes = keyof Pick<MbscEventcalendarView, 'schedule' | 'timeline'>;

export type { ScheduleTypes };