const User=()=>import('@/views/users/User')
const CreateUser=()=>import('@/views/users/CreateUser')
const UserRoutes={
    path:'users',component:User,
    children:[
        {
            path: 'create',component:CreateUser,name:'users-create'
        }
    ]
}
export default UserRoutes