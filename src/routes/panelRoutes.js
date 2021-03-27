const Panel = () => import('@/views/Panel')
import ArticleRoutes from "./ArticlesRoutes";
import CourseRoutes from "./CourseRoutes";
import RolesRoutes from "./RolesRoutes";
import UserRoutes from "./UserRoutes";
import VideosRoutes from "@/routes/VideosRoutes";
import CommentRoutes from "@/routes/CommentRotues";
import DiscountRoutes from "@/routes/DiscountsRoutes";
const panel = {
    path: '/panel',
    component: Panel,
    children: []
}
panel.children.push(ArticleRoutes)
panel.children.push(CourseRoutes)
panel.children.push(RolesRoutes)
panel.children.push(UserRoutes)
panel.children.push(VideosRoutes)
panel.children.push(CommentRoutes)
panel.children.push(DiscountRoutes)
export default panel;