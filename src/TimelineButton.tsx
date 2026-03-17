import classNames from "classnames";
import { TIMELINE_ZOOM_LEVEL } from "./defaults";

const TimelineButton = ({
  zoomlevel,
  setZoomlevel,
}: {
  zoomlevel: number;
  setZoomlevel: (newZoomLevel: number) => void;
}) => {
  return (
    <div className="border-fb-primary-500 flex h-[2.875rem] items-center overflow-hidden rounded-lg border">
      {TIMELINE_ZOOM_LEVEL.map((mode) => (
        <button
          key={mode.value}
          onClick={() => setZoomlevel(mode.value)}
          className={classNames(
            "text-fb-white h-full px-4 text-sm font-medium transition-colors",
            {
              "bg-fb-primary-400": zoomlevel === mode.value,
              "bg-fb-primary-700 hover:bg-fb-primary-600":
                zoomlevel !== mode.value,
            },
          )}
        >
          {mode.displayName}
        </button>
      ))}
    </div>
  );
};
export { TimelineButton };
