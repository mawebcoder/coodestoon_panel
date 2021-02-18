const Panel = () => import('@/views/Panel')
import ArticleRoutes from "./ArticlesRoutes";
import CourseRoutes from "./CourseRoutes";
import RolesRoutes from "./RolesRoutes";
const panel = {
    path: '/panel',
    component: Panel,
    children: []
}
panel.children.push(ArticleRoutes)
panel.children.push(CourseRoutes)
panel.children.push(RolesRoutes)
export default panel;