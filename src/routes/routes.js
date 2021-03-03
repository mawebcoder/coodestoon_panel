//import components section
import panel from "./panelRoutes";
import notFound from "./NotFound";
import AuthRoutes from "./AuthRoutes";
import Editor from "@/views/Editor";

const routes = [
    {
        path: '/editor', component: Editor
    }
]
routes.push(panel)
routes.push(AuthRoutes)
routes.push(notFound)
export default routes;
