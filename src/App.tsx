import { useMemo, useState, useRef, useCallback } from "react";
import {
  Eventcalendar,
  MbscCalendarEvent,
  MbscEventcalendarView,
  MbscSelectedDateChangeEvent,
  luxonTimezone,
  setOptions,
} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { useCalendarPageStartDate } from "./useCalendarPageStartDate";
import { useRenderHeader } from "./hooks/useRenderHeader";
import { useZoomLevel } from "./ZoomLevelContext/useZoomLevel";
import { TIMELINE_ZOOM_LEVELS_DEFINITIONS } from "./defaults";
import * as luxon from "luxon";

luxonTimezone.luxon = luxon;

setOptions({
  theme: "material",
  themeVariant: "light",
});

const events: MbscCalendarEvent[] = [
  {
    id: 1,
    start: "2026-03-10T09:00",
    end: "2026-03-10T11:00",
    title: "Spotkanie zespołu",
    resource: 1,
    color: "#1a73e8",
  },
  {
    id: 2,
    start: "2026-03-11T13:00",
    end: "2026-03-11T14:30",
    title: "Code Review",
    resource: 2,
    color: "#e67c73",
  },
  {
    id: 3,
    start: "2026-03-12T10:00",
    end: "2026-03-12T12:00",
    title: "Sprint Planning",
    resource: 1,
    color: "#f4511e",
  },
  {
    id: 4,
    start: "2026-03-13T15:00",
    end: "2026-03-13T16:00",
    title: "Demo dla klienta",
    resource: 3,
    color: "#33b679",
  },
  {
    id: 5,
    start: "2026-03-14T08:30",
    end: "2026-03-14T09:30",
    title: "Daily Standup",
    resource: 2,
    color: "#7986cb",
  },
  {
    id: 6,
    start: "2026-03-10T14:00",
    end: "2026-03-10T15:30",
    title: "Warsztaty UX",
    resource: 3,
    color: "#8e24aa",
  },
  {
    id: 7,
    start: luxon.DateTime.now().minus({ days: 1 }).toFormat("yyyy-MM-dd"),
    end: luxon.DateTime.now().plus({ days: 2 }).toFormat("yyyy-MM-dd"),
    allDay: true,
    title: "Wydarzenie całodniowe",
    resource: 1,
    color: "#0b8043",
  },
];

const resources = [
  { id: 1, name: "Zespół A", color: "#1a73e8" },
  { id: 2, name: "Zespół B", color: "#e67c73" },
  { id: 3, name: "Zespół C", color: "#33b679" },
];

type ViewMode = "timeline" | "schedule" | "calendar" | "agenda";

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");

  const { fromDate, selectedDate, onDateChange } = useCalendarPageStartDate();

  const { zoomLevel, setZoomLevel } = useZoomLevel();

  const skipZoomDateChangeRef = useRef(false);

  const handleBeforeZoomChange = useCallback(() => {
    skipZoomDateChangeRef.current = true;
    setTimeout(() => {
      skipZoomDateChangeRef.current = false;
    }, 100);
  }, []);

  const renderHeader = useRenderHeader(handleBeforeZoomChange);

  const safeOnDateChange = useCallback(
    (args: MbscSelectedDateChangeEvent) => {
      if (skipZoomDateChangeRef.current) {
        skipZoomDateChangeRef.current = false;
        return;
      }
      onDateChange(args);
    },
    [onDateChange],
  );

  const view = useMemo<MbscEventcalendarView>(() => {
    switch (viewMode) {
      case "timeline":
        return {
          timeline: {
            timeCellStep: 60,
            timeLabelStep: 60,
            weekNumbers: false,
            currentTimeIndicator: true,
            zoomLevels: TIMELINE_ZOOM_LEVELS_DEFINITIONS,
            maxEventStack: "all",
            eventHeight: "variable",
            rowHeight: "variable",
          },
        };
      case "schedule":
        return {
          schedule: { type: "day", size: 7 },
        };
      case "calendar":
        return { calendar: { type: "month", labels: true } };
      case "agenda":
        return {
          agenda: { type: "month" },
        };
    }
  }, [viewMode]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "12px 16px",
          background: "#f5f5f5",
          borderBottom: "1px solid #ddd",
        }}
      >
        {(["timeline", "schedule", "calendar", "agenda"] as ViewMode[]).map(
          (mode) => (
            <button
              key={mode}
              onClick={() => {
                if (mode === "timeline") {
                  setZoomLevel(4);
                } else if (mode === "schedule") {
                  setZoomLevel(6);
                }

                setViewMode(mode);
              }}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontWeight: viewMode === mode ? 600 : 400,
                background: viewMode === mode ? "#1a73e8" : "#fff",
                color: viewMode === mode ? "#fff" : "#333",
              }}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ),
        )}
      </div>
      <div style={{ flex: 1 }}>
        <Eventcalendar
          // key={`${viewMode}-${zoomLevel}`}
          renderHeader={renderHeader}
          data={events}
          resources={viewMode === "timeline" ? resources : undefined}
          timezonePlugin={luxonTimezone}
          view={view}
          dataTimezone="utc"
          timeFormat="HH:mm"
          showControls={true}
          clickToCreate={true}
          dragToCreate={true}
          dragToMove={true}
          dragToResize={true}
          selectedDate={selectedDate}
          refDate={fromDate}
          onSelectedDateChange={safeOnDateChange}
          zoomLevel={zoomLevel}
        />
      </div>
    </div>
  );
}

export default App;
