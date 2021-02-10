//import components section

const EditArticleCategory =()=> import("@/views/articles/categories/EditArticleCategory");
const ActiveArticleCategory=()=>import('@/views/articles/categories/ActiveArticleCategory')
const Articles = () => import('@/layouts/Articles')
const CreateTag = () => import('../views/articles/tags/CreateTag')
const List = () => import('@/views/articles/tags/List')
const ActiveTagsList = () => import('@/views/articles/tags/ActiveTagsList')
const DeActiveTags = () => import('@/views/articles/tags/DeActiveTags')
const Trashes = () => import('@/views/articles/tags/Trashed')
const ArticleTags = () => import('@/layouts/ArticleTags');
const Categories = () => import('@/layouts/Categories')
const DeActiveArticleCategory=()=>import('@/views/articles/categories/DeActiveArticleCategory')
const ArticleCategoryList =()=>import("@/views/articles/categories/ArticleCategoryList");
const CreateArticleCategory = () => import('@/views/articles/categories/CreateArticleCategory')
const routes = [
    // Articles-------------articles--------------articles--------
    {
        path: '/panel/articles', component: Articles,
        children: [
            {
                // articles tags
                path: 'tags', component: ArticleTags,
                children: [
                    {
                        path: 'list', component: List, name: 'article-tag-list'
                    },
                    {
                        path: 'create', component: CreateTag, name: 'article-tag-create'
                    },
                    {
                        path: 'actives', component: ActiveTagsList, name: 'article-tags-active'
                    },
                    {
                        path: 'de-actives', component: DeActiveTags, name: 'article-tags-de-active'
                    },
                    {
                        path: 'trashes', component: Trashes, name: 'article-tags-trashes'
                    },
                ]
            },

            {
                // articles categories
                path: 'categories', component: Categories,
                children: [
                    {
                        path: 'store', component: CreateArticleCategory, name: 'article-category-create'
                    },
                    {
                        path: 'list',component:ArticleCategoryList,name: 'article-category-list'
                    },
                    {
                        path: 'edit/:articleCategory',component:EditArticleCategory,name: 'article-category-edit'
                    },
                    {
                        path: 'actives',component:ActiveArticleCategory,name: 'article-category-active'
                    },
                    {
                        path: 'de-actives',component:DeActiveArticleCategory,name: 'article-category-deactive'
                    }
                ]
            },

        ]
    },

]

export default routes;
