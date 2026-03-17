import { useContext } from 'react';
import { ZoomLevelContext } from './ZoomLevelContext';

const useZoomLevel = () => {
  const context = useContext(ZoomLevelContext);
  if (!context) {
    throw new Error('useZoomLevel must be used within a ZoomLevelProvider');
  }
  return context;
};

export { useZoomLevel };
