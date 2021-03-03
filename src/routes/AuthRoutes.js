const AuthPage=()=>import('@/views/AuthPage')
const AuthRoutes = {
    path: '/login',
    component:AuthPage,
    name: 'login'
}
export default AuthRoutes;