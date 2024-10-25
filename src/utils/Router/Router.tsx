import {ReactNode, useEffect, useState} from "react";
import NotFound from "../../pages/NotFound";

interface RouterItem {
  path: string;
  element: ReactNode
}

interface RouterProps {
  config: RouterItem[];
}

export function Router({ config }: RouterProps) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const route = config.find(route => {
    const pathPattern = route.path.replace(/:[^\s/]+/g, '[^/]+');
    return new RegExp(`^${pathPattern}$`).test(currentPath);
  });

  return (
      <>
        {route ? route.element : <NotFound />}
      </>
  );
}

export default Router;