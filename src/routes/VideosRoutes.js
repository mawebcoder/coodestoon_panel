const Videos = () => import('@/views/videos/Videos')
const VideoTag = () => import('@/views/videos/tags/VideoTag')
const CreateVideoTag = () => import('@/views/videos/tags/CreateVideoTag')
const VideoTagList = () => import('@/views/videos/tags/VideoTagList')
const ActiveVideoTag = () => import('@/views/videos/tags/ActiveVideoTag')
const DeActiveVideoTags = () => import('@/views/videos/tags/DeActiveVideoTags')
const CreateVideo = () => import('@/views/videos/CreateVideo')
const UploadVideo=()=>import('@/views/videos/UploadVideo')
const NotUploaded=()=>import('@/views/videos/NotUploaded')
const VideoList=()=>import('@/views/videos/VideoList')
const ActiveVideo=()=>import('@/views/videos/ActiveVideo')
const DeActiveVideo=()=>import('@/views/videos/DeActiveVideo')
const VideoTrash=()=>import('@/views/videos/VideoTrash')
const SingleVideoList=()=>import('@/views/videos/SingleVideoList')
const EditVideo=()=>import('@/views/videos/EditVideo')
const VideoRotues = {
    path: 'videos', component: Videos,
    children: [
        {
            path: 'tags', component: VideoTag,
            children: [
                {
                    path: 'create', component: CreateVideoTag, name: 'videos-tag-create'
                },
                {
                    path: 'list', component: VideoTagList, name: 'video-tag-list'
                },
                {
                    path: 'actives', component: ActiveVideoTag, name: 'video-tag-actives'
                },
                {
                    path: 'deactives', component: DeActiveVideoTags, name: 'video-tag-deactives'
                }
            ],
        },
        {
            path: 'create', component: CreateVideo, name: 'video-store'
        },
        {
            path:'upload/:id',component:UploadVideo,name: 'video-upload'
        },
        {
            path:'not-uploaded',component:NotUploaded,name:'video-notuploaded'
        },
        {
            path: 'list',component:VideoList,name: "video-list"
        },
        {
            path:'actives',component:ActiveVideo,name:'video-active'
        },
        {
            path:'de-actives',component:DeActiveVideo,name: 'video-deactive'
        },
        {
            path:'trashes',component:VideoTrash,name:'video-trash'
        },
        {
            path:'singles',component:SingleVideoList,name:'video-single'
        },
        {
            path:'edit/:id',component:EditVideo,name: 'video-edit'
        }
    ]
}
export default VideoRotues