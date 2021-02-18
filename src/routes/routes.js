//import components section
import panel from "./panelRoutes";
import notFound from "./NotFound";
import AuthRoutes from "./AuthRoutes";
const routes = []
routes.push(panel)
routes.push(AuthRoutes)
routes.push(notFound)
export default routes;
