//import components section
import panel from "./panelRoutes";
import notFound from "./NotFound";
import AuthRoutes from "./AuthRoutes";
const VerifyCodePage=()=>import('@/views/VerifyCodePage')
import Editor from "@/views/Editor";

const routes = [
    {
        path: '/editor', component: Editor
    },
    {
        path:'/verify-code',component: VerifyCodePage,name:'auth-verify-code'
    }
]
routes.push(panel)
routes.push(AuthRoutes)
routes.push(notFound)
export default routes;
