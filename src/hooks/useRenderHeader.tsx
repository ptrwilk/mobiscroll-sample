import { useCallback } from "react";
import { useZoomLevel } from "../ZoomLevelContext/useZoomLevel";
import { TimelineButton } from "../TimelineButton";
import {
  CalendarNav,
  CalendarPrev,
  CalendarNext,
  CalendarToday,
} from "@mobiscroll/react-next";

const useRenderHeader = () => {
  const { zoomLevel, setZoomLevel } = useZoomLevel();

  return useCallback(
    () => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <CalendarPrev />
        <CalendarToday />
        <CalendarNext />
        <CalendarNav />
        <TimelineButton zoomlevel={zoomLevel} setZoomlevel={setZoomLevel} />
      </div>
    ),
    [zoomLevel, setZoomLevel]
  );
};

export { useRenderHeader };
