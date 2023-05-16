// 保存
export const UPDATE_PAGE = process.env.VUE_APP_MICROAPP_URL + '/outside/miniapps/update/page'
// 获取页面配置
export const GET_PAGE = process.env.VUE_APP_MICROAPP_URL + '/outside/miniapps/get/page'
// 获取有权限的APP
export const GET_APPS = process.env.VUE_APP_MICROAPP_URL + '/outside/miniapps/get/apps'
// 获取应用内其他配置页
export const GET_PAGES = process.env.VUE_APP_MICROAPP_URL + '/outside/miniapps/get/pages'
// 获取用户有管理权限的栏目列表
export const ITEMS = process.env.VUE_APP_MICROAPP_URL + '/outside/item/auth'
// 文件上传
export const FILE_UPLOAD = process.env.VUE_APP_MICROAPP_URL + '/outside/file/upload'
// 文件删除
export const FILE_REMOVE = process.env.VUE_APP_MICROAPP_URL + '/outside/file/remove'
// 获取图片base64编码
export const BASE64_URL = process.env.VUE_APP_MICROAPP_URL + '/outside/file/base64'
// 获取最新文章
export const ARTICLE_NEW = process.env.VUE_APP_MICROAPP_URL + '/outside/diy/data/article/latest'
// 获取热门文章（浏览次数最多）
export const ARTICLE_HOT = process.env.VUE_APP_MICROAPP_URL + '/outside/diy/data/article/popular'
// 获取星标文章
export const ARTICLE_STAR = process.env.VUE_APP_MICROAPP_URL + '/outside/diy/data/article/star'
// 获取文章（权限设置为栏目可见）
export const ARTICLE_LIST = process.env.VUE_APP_MICROAPP_URL + '/outside/diy/data/article/item'
// 视频/(公开)自选
export const VEDIO_LIST = process.env.VUE_APP_MICROAPP_URL + '/outside/diy/data/video/item'
// 视频/最新
export const VEDIO_LIST_NEW = process.env.VUE_APP_MICROAPP_URL + '/outside/diy/data/video/latest'
// 视频/热度
export const VEDIO_LIST_POPULAR = process.env.VUE_APP_MICROAPP_URL + '/outside/diy/data/video/popular'
// 获取最新问答
export const QUESTION_NEW = process.env.VUE_APP_MICROAPP_URL + '/outside/diy/data/faq/latest'
// 获取热门问答
export const QUESTION_HOT = process.env.VUE_APP_MICROAPP_URL + '/outside/diy/data/faq/popular'
// 获取问答列表
export const QUESTION_LIST = process.env.VUE_APP_MICROAPP_URL + '/outside/diy/data/faq/item'

// 文章收藏列表
export const COLLECT_ARTICLES = process.env.VUE_APP_MICROAPP_URL + '/outside/article/collect/list'
// 问答收藏列表
export const COLLECT_QUESTIONS = process.env.VUE_APP_MICROAPP_URL + '/outside/faq/collect/list'
// 视频收藏列表
export const COLLECT_VIDEOS = process.env.VUE_APP_MICROAPP_URL + '/outside/video/collect/list'
// 收藏列表
export const COLLECT_LIST = process.env.VUE_APP_MICROAPP_URL + '/outside/diy/data/collect/latest'

// 文章分类
export const ARTICLE_TYPE = process.env.VUE_APP_MICROAPP_URL + '/outside/article/type'
// 问答分类
export const QUESTION_TYPE = process.env.VUE_APP_MICROAPP_URL + '/outside/faq/types'
// 视频分类
export const VIDEO_TYPE = process.env.VUE_APP_MICROAPP_URL + '/outside/video/types'

// 根据分类id获取分类信息
export const TYPE_INFO = process.env.VUE_APP_MICROAPP_URL + '/outside/diy/data/public/getType'

// 获取引用组件信息
export const REFRERENCE_INFO = process.env.VUE_APP_MICROAPP_URL + '/outside/miniapps/get/component'
// 引用组件更新
export const REFRERENCE_SAVE = process.env.VUE_APP_MICROAPP_URL + '/outside/miniapps/update/component'
// 引用组件列表
export const REFRERENCE_LIST = process.env.VUE_APP_MICROAPP_URL + '/outside/miniapps/get/components'