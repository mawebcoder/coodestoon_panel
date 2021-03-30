import AuthService from "@/services/Auth/AuthService";

const EditArticleCategory = () => import("@/views/articles/categories/EditArticleCategory");
const ActiveArticleCategory = () => import('@/views/articles/categories/ActiveArticleCategory')
const Articles = () => import('@/layouts/Articles')
const CreateTag = () => import('../views/articles/tags/CreateTag')
const List = () => import('@/views/articles/tags/List')
const ActiveTagsList = () => import('@/views/articles/tags/ActiveTagsList')
const DeActiveTags = () => import('@/views/articles/tags/DeActiveTags')
const Trashes = () => import('@/views/articles/tags/Trashed')
const ArticleTags = () => import('@/layouts/ArticleTags');
const Categories = () => import('@/layouts/Categories')
const Article = () => import('@/views/articles/Article')
const DeActiveArticleCategory = () => import('@/views/articles/categories/DeActiveArticleCategory')
const ArticleCategoryList = () => import("@/views/articles/categories/ArticleCategoryList");
const ArticleCategoryTrash = () => import('@/views/articles/categories/Trashe')
const StoreArticle = () => import('@/views/articles/StoreArticle')
const ArticleList = () => import('@/views/articles/List')
const ArticleEdit = () => import('@/views/articles/Edit.vue')
const ActiveArticles = () => import('@/views/articles/Actives')
const DeActiveArticle = () => import('@/views/articles/DeActiveArticle')
const ArticleTrashes = () => import('@/views/articles/Trashes');
const CreateArticleCategory = () => import('@/views/articles/categories/CreateArticleCategory')

let ArticleRoutes = {

    path: 'articles', component: Articles,
    beforeEnter: (to, from, next) => {
        AuthService.checkLogin(next)
    },
    children: [
        {
            // articles tags
            path: 'tags', component: ArticleTags,
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
            children: [
                {
                    path: 'list', component: List, name: 'article-tag-list',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'create', component: CreateTag, name: 'article-tag-create',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'actives', component: ActiveTagsList, name: 'article-tags-active',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'de-actives', component: DeActiveTags, name: 'article-tags-de-active',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'trashes', component: Trashes, name: 'article-tags-trashes',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
            ]
        },
        {
            // articles categories
            path: 'categories', component: Categories,
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
            children: [
                {
                    path: 'store', component: CreateArticleCategory, name: 'article-category-create',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'list', component: ArticleCategoryList, name: 'article-category-list',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'edit/:articleCategory', component: EditArticleCategory, name: 'article-category-edit',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'actives', component: ActiveArticleCategory, name: 'article-category-active',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'de-actives', component: DeActiveArticleCategory, name: 'article-category-deactive',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'trashes', component: ArticleCategoryTrash, name: 'article-category-trash',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                }
            ]
        },
        {
            // articles
            path: 'articles',
            component: Article,
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
            children: [
                {
                    path: 'create', component: StoreArticle, name: 'article-store',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'list', component: ArticleList, name: 'article-list',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'edit/:article', component: ArticleEdit, name: 'article-edit',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'actives', component: ActiveArticles, name: 'article-actives',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'de-actives', component: DeActiveArticle, name: 'article-de-actives',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'trashes', component: ArticleTrashes, name: 'article-trashes',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                }

            ]
        }

    ]
}
export default ArticleRoutes