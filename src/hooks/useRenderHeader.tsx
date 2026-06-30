import { useCallback } from "react";
import { useZoomLevel } from "../ZoomLevelContext/useZoomLevel";
import { TimelineButton } from "../TimelineButton";
import {
  CalendarNav,
  CalendarPrev,
  CalendarNext,
  CalendarToday,
} from "@mobiscroll/react-next";

const useRenderHeader = (onBeforeZoomChange?: () => void) => {
  const { zoomLevel, setZoomLevel } = useZoomLevel();

  const wrappedSetZoomlevel = useCallback(
    (level: number) => {
      if (level !== zoomLevel) onBeforeZoomChange?.();
      setZoomLevel(level);
    },
    [onBeforeZoomChange, setZoomLevel, zoomLevel],
  );

  return useCallback(
    () => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <CalendarPrev />
        <CalendarToday />
        <CalendarNext />
        <CalendarNav />
        <TimelineButton
          zoomlevel={zoomLevel}
          setZoomlevel={wrappedSetZoomlevel}
        />
      </div>
    ),
    [zoomLevel, wrappedSetZoomlevel],
  );
};

export { useRenderHeader };
