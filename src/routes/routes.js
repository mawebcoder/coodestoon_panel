//import components section
const CreateTag=()=>import('../views/articles/tags/CreateTag')
const List=()=>import('@/views/articles/tags/List')
const ActiveTagsList=()=>import('@/views/articles/tags/ActiveTagsList')
const DeActiveTags=()=>import('@/views/articles/tags/DeActiveTags')
const Trashes=()=>import('@/views/articles/tags/Trashed')
const CreateArticleCategory=()=>import('@/views/articles/categories/CreateArticleCategory')
const routes=[
    {
      path: '/panel/articles/tags/list',component:List,name: 'article-tag-list'
    },
    {
        path:'/panel/articles/tags/create',component:CreateTag,name:'article-tag-create'
    },
    {
        path:'/panel/articles/tags/actives',component:ActiveTagsList,name: 'article-tags-active'
    },
    {
        path:'/panel/articles/tags/de-actives',component:DeActiveTags,name: 'article-tags-de-active'
    },
    {
        path:'/panel/articles/tags/trashes',component:Trashes,name: 'article-tags-trashes'
    },
    {
        path: '/panel/articles/categories/store',component:CreateArticleCategory,name: 'article-category-create'
    }
]

export default routes;
