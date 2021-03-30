//import components section
import axios from "axios";
import panel from "./panelRoutes";
import notFound from "./NotFound";
import AuthRoutes from "./AuthRoutes";
import test from "@/views/test";

const NotFoundPage = () => import('@/views/NotFound')
const VerifyCodePage = () => import('@/views/VerifyCodePage')
import Editor from "@/views/Editor";

const routes = [
    {
        path: '/test',
        component: test
    },
    {
        path: '/editor', component: Editor
    },
    {
        path: '/no-found', component: NotFoundPage, name: 'not-found'
    },
    {
        path: '/verify-code', component: VerifyCodePage, name: 'auth-verify-code',
        beforeEnter: (to, from, next) => {
            let cell = localStorage.getItem('cell');
            let hashed_pass = localStorage.getItem('pass');
            if (cell === null || hashed_pass === null) {
                next({name: 'login'})
                return;
            }
            let data = {
                'cell': cell,
                'pass': hashed_pass
            }
            axios.post('/v1/admin/check-temporary-pass-correct', data)
                .then(() => {
                    next();
                }).catch(() => {
                next({name: 'login'})
            })
        }
    }
]
routes.push(panel)
routes.push(AuthRoutes)
routes.push(notFound)
export default routes;
