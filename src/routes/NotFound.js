const  noFoundPage=()=>import('@/views/NotFound')
let notFound={
    path:'*',component:noFoundPage,name:'not-found-page'
}
export default notFound;