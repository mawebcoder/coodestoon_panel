import axios from "axios";
import store from "@/store/vuex";

const Panel = () => import('@/views/Panel')
import ArticleRoutes from "./ArticlesRoutes";
import CourseRoutes from "./CourseRoutes";
import RolesRoutes from "./RolesRoutes";
import UserRoutes from "./UserRoutes";
import VideosRoutes from "@/routes/VideosRoutes";
import CommentRoutes from "@/routes/CommentRotues";
import DiscountRoutes from "@/routes/DiscountsRoutes";
import DepartmentRoutes from "@/routes/DepartmentRoutes";

const panel = {
    path: '/panel',

    beforeEnter: (to, from, next) => {
        localStorage.removeItem('pass')
        axios.post('/v1/admin/authorization', {}, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => {

            store.state.role = res.data.data.role;
            store.state.permissions = res.data.data.permissions

            next()

        }).catch(() => {

            next({name: 'not-found'})

        })

    },

    component: Panel,
    children: []
}
panel.children.push(ArticleRoutes)
panel.children.push(CourseRoutes)
panel.children.push(RolesRoutes)
panel.children.push(DepartmentRoutes)
panel.children.push(UserRoutes)
panel.children.push(VideosRoutes)
panel.children.push(CommentRoutes)
panel.children.push(DiscountRoutes)
export default panel;