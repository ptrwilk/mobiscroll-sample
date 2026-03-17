import { MbscTimelineZoomLevel } from "@mobiscroll/react-next";

const DEFAULT_SCHEDULE_ZOOM_LEVEL = 6;
const DEFAULT_TIMELINE_ZOOM_LEVEL = 4;

const TIMELINE_ZOOM_LEVEL = [
  { displayName: "Time", value: 4 },
  { displayName: "Summary", value: 3 },
];

const TIMELINE_ZOOM_LEVELS_DEFINITIONS: {
  [key: string]: MbscTimelineZoomLevel;
} = {
  4: {
    resolutionHorizontal: "hour",
    type: "day",
    size: 90,
    timeCellStep: 360,
    timeLabelStep: 360,
    columnWidth: "medium",
  },
  3: {
    resolutionHorizontal: "day",
    type: "day",
    size: 90,
    columnWidth: "xlarge",
    eventList: true,
  },
};

export {
  DEFAULT_SCHEDULE_ZOOM_LEVEL,
  DEFAULT_TIMELINE_ZOOM_LEVEL,
  TIMELINE_ZOOM_LEVEL,
  TIMELINE_ZOOM_LEVELS_DEFINITIONS,
};
