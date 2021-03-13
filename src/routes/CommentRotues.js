const Comment=()=>import('@/views/comments/Comment')
const VideoCommentListUnAccepted=()=>import('@/views/comments/VideoCommentListUnAccepted')
const VideoCommentsAccepted=()=>import('@/views/comments/VideoCommentsListAccepted')
const ArticleCommentsAccepted=()=>import('@/views/comments/ArticleCommentsAccepted')
const ArticleCommentUnAccepted=()=>import('@/views/comments/ArticleCommentUnAccepted')
const CourseCommentAccepted=()=>import('@/views/comments/CourseCommentsAccepted')
const CourseCommentUnAccepted=()=>import('@/views/comments/CourseCommentUnAccepted')
const  CommentRoutes={
    path:'comments',component:Comment,
    children:[
        {
            path:'videos/comments/un-accepted',component:VideoCommentListUnAccepted,name:'video-comments-unaccepted'
        },
        {
            path:'videos/comments/accepted',component:VideoCommentsAccepted,name:'video-comments-accepted'
        },
        {
            path:'articles/comments/accepted',component:ArticleCommentsAccepted,name:'article-comments-accepted'
        },
        {
            path:'articles/comments/un-accepted',component:ArticleCommentUnAccepted,name:'article-comments-un-accepted'
        },
        {
            path:'course/comments/accepted',component:CourseCommentAccepted,name:'course-comment-accepted'
        },
        {
            path:'course/comments/un-accepted',component:CourseCommentUnAccepted,name:'course-comments-un-accepted'
        }
    ]
}
export default CommentRoutes;