import {ReactNode} from "react";
import {AvailablePaths} from "../../App.tsx";

type RouteParams = Record<string, string | number>;

type LinkProps = {
    to: AvailablePaths;
    params?: RouteParams;
    children: ReactNode;
};

export function Link({ to, params, children }: LinkProps) {
    // Function for changing dynamic path
    const generatePath = (to: string, params?: RouteParams) => {
        // If it doesn't have dynamic params just return original "to"
        if (!params) return to;

        // Replace all dynamic parameters that start with a ":"
        return to.replace(/:([a-zA-Z]+)/g, (_, key: string) => {
            return params[key] !== undefined ? String(params[key]) : `:${key}`;
        });
    };

    const href = generatePath(to, params);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        //Allows to add a new URL to the history without reloading the page
        window.history.pushState({}, '', href);
        //Inform browser that path was changed, content should be rerender, also it's need for back/next button
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <a href={href} onClick={handleClick}>
            {children}
        </a>
    );
}

export default Link;