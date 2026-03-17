import { useZoomLevel } from './useZoomLevel';

const ZoomLevelDisplay = () => {
  const { zoomLevel } = useZoomLevel();

  return (
    <div className="bg-fb-primary-700 text-fb-white fixed right-4 bottom-16 z-50 rounded-md px-3 py-2 text-sm shadow-lg">
      Zoom Level: <span className="font-bold">{zoomLevel}</span>
    </div>
  );
};

export { ZoomLevelDisplay };
