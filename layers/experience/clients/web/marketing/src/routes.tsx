import { paths } from "./utilities/constants";
import * as pages from "./pages";
import { Route, Routes as ReactRouterRoutes } from "react-router-dom";

export const Routes: React.FC = () => (
    <ReactRouterRoutes>
      <Route path={paths.home} element={<pages.Home />} />
    </ReactRouterRoutes>
);