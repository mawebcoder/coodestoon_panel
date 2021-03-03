const Panel = () => import('@/views/Panel')
import ArticleRoutes from "./ArticlesRoutes";
import CourseRoutes from "./CourseRoutes";
import RolesRoutes from "./RolesRoutes";
import UserRoutes from "./UserRoutes";
const panel = {
    path: '/panel',
    component: Panel,
    children: []
}
panel.children.push(ArticleRoutes)
panel.children.push(CourseRoutes)
panel.children.push(RolesRoutes)
panel.children.push(UserRoutes)
export default panel;