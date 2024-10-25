import {useEffect, useState} from "react";

export function useParams(routePattern: string) {
    const [params, setParams] = useState<Record<string, string>>({});

    useEffect(() => {
        const currentPath = window.location.pathname;

        const extractParams = (pattern: string, path: string) => {
            // Remove empty strings
            const patternParts = pattern.split("/").filter(Boolean);
            const pathParts = path.split("/").filter(Boolean);

            if (patternParts.length !== pathParts.length) return null;

            const params: Record<string, string> = {};

            for (let i = 0; i < patternParts.length; i++) {
                if (patternParts[i].startsWith(":")) {
                    // Remove : and get parameterName corresponded value
                    const paramName = patternParts[i].slice(1);
                    params[paramName] = pathParts[i];
                } else if (patternParts[i] !== pathParts[i]) {
                    return null;
                }
            }

            return params;
        };

        const routeParams = extractParams(routePattern, currentPath);

        if (routeParams) {
            setParams(routeParams);
        }
    }, [routePattern]);


    return params;
}