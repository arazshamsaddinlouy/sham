import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768; // You can adjust this breakpoint

const useIsMobile = (): boolean => {
  const getIsMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export default useIsMobile;
