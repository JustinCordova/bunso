import { useState, useCallback } from "react";

export const useSpotlight = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const onMouseEnter = useCallback(() => setHover(true), []);
  const onMouseLeave = useCallback(() => setHover(false), []);

  return {
    coords,
    hover,
    eventHandlers: {
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
    },
  };
};
