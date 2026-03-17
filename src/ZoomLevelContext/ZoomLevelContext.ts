import { createContext } from 'react';

interface ZoomLevelContextValue {
  zoomLevel: number;
  setZoomLevel: (zoomLevel: number) => void;
}

const ZoomLevelContext = createContext<ZoomLevelContextValue | undefined>(undefined);

export type { ZoomLevelContextValue };
export { ZoomLevelContext };
