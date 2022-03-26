// 文章相关的API接口，都封装到这个模块
import request from '@/utils/request.js'
// eslint-disable-next-line space-before-function-paren
export const getArticleListAPI = function (_page, _limit) {
  // console.log('调用了getArticleListAPI')
  return request.get('/articles', {
    params: {
      _page,
      _limit
    }
  })
}
