import { useCallback, useMemo, useState } from 'react';
import { ZoomLevelContext } from './ZoomLevelContext';

const DEFAULT_ZOOM_LEVEL = 4;

const ZoomLevelProvider = ({ children }: { children: React.ReactNode }) => {
  const [zoomLevel, setZoomLevelState] = useState(DEFAULT_ZOOM_LEVEL);

  const setZoomLevel = useCallback((level: number) => {
    setZoomLevelState(level);
  }, []);

  const value = useMemo(() => ({ zoomLevel, setZoomLevel }), [zoomLevel, setZoomLevel]);

  return <ZoomLevelContext value={value}>{children}</ZoomLevelContext>;
};

export { ZoomLevelProvider };
