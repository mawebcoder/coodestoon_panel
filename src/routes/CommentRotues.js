import AuthService from "@/services/Auth/AuthService";

const Comment = () => import('@/views/comments/Comment')
const VideoCommentListUnAccepted = () => import('@/views/comments/VideoCommentListUnAccepted')
const VideoCommentsAccepted = () => import('@/views/comments/VideoCommentsListAccepted')
const ArticleCommentsAccepted = () => import('@/views/comments/ArticleCommentsAccepted')
const ArticleCommentUnAccepted = () => import('@/views/comments/ArticleCommentUnAccepted')
const CourseCommentAccepted = () => import('@/views/comments/CourseCommentsAccepted')
const CourseCommentUnAccepted = () => import('@/views/comments/CourseCommentUnAccepted')
const CommentRoutes = {
    path: 'comments', component: Comment,

    children: [
        {
            path: 'videos/comments/un-accepted',
            component: VideoCommentListUnAccepted,
            name: 'video-comments-unaccepted',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'videos/comments/accepted', component: VideoCommentsAccepted, name: 'video-comments-accepted',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'articles/comments/accepted', component: ArticleCommentsAccepted, name: 'article-comments-accepted',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'articles/comments/un-accepted',
            component: ArticleCommentUnAccepted,
            name: 'article-comments-un-accepted',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'course/comments/accepted', component: CourseCommentAccepted, name: 'course-comment-accepted',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'course/comments/un-accepted',
            component: CourseCommentUnAccepted,
            name: 'course-comments-un-accepted',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        }
    ]
}
export default CommentRoutes;