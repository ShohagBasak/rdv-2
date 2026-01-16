import { useEffect } from "react";
import { useLocation } from "react-router";

export default function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      "/": "Home",
      "/feature": "Features",
      "/Staff": "Staff",
    };

    const currentTitle = routeTitles[location.pathname] || "Page";

    document.title = `${currentTitle} | Rimel's Discord`;
  }, [location.pathname]);

  return null;
}
