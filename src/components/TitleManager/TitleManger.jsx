import { useEffect } from "react";
import { useLocation } from "react-router";

export default function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      "/": "Home",
      "/feature": "Features",
      "/staff": "TeamData",
      "/minecraft": "Minecraft",
    };

    const currentTitle = routeTitles[location.pathname] || "Page";

    document.title = `${currentTitle} | Rimel's Discord`;
  }, [location.pathname]);

  return null;
}
