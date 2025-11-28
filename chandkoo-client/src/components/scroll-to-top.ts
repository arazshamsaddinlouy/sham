import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Component that handles scrolling
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [pathname]);

  return null;
}
