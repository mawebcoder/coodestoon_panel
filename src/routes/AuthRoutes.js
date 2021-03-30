import axios from "axios";

const AuthPage=()=>import('@/views/AuthPage')
const AuthRoutes = {
    path: '/login',
    component:AuthPage,
    name: 'login',
    beforeEnter: (to,from,next)=>{

        if (localStorage.getItem('token')!==null){
            axios.post('/v1/admin/authorization',{},{
                headers:{
                    Authorization:'Bearer '+localStorage.getItem('token')
                }
            }).then(()=>{
                next({name:'article-tag-list'})
            }).catch(()=>{
                next();
            })
            return;

        }
        next();
    }
}
export default AuthRoutes;