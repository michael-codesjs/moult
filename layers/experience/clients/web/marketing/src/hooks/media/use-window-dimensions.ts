import { useEffect, useState } from "react";

export default function useWindowDimensions() {
  
  const getDimensions = () => ({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [dimensions, setDimensions] = useState(getDimensions());

  useEffect(() => {
    const handler = () => setDimensions(getDimensions());
    window.addEventListener("resize",handler);
    return () => window.removeEventListener("resize",handler);
  },[]);

  return dimensions;

}