/* eslint-disable no-sequences */
<template>
  <div class="home-container">
    <van-nav-bar title="黑马头条" fixed />
    <!-- 导入 ，注册， 并使用ArticleList -->
    <!-- <p>{{ artlist.length }}</p> -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :disabled="finished"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleInfo
          v-for="item in artlist"
          :key="item.id"
          :title="item.title"
          :author="item.aut_name"
          :cmt-count="item.comm_count"
          :time="item.pubdate"
          :cover="item.cover"
        ></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleInfo from '@/components/Article/ArticleInfo.vue'
// import request from '@/utils/request.js'
import { getArticleListAPI } from '@/api/articleAPI.js'
export default {
  name: 'my-home',
  data() {
    return {
      // 页码值
      page: 1,
      // 每页显示多少条数据
      limit: 10,
      artlist: [],
      // 是否加载下一页数据，如果loading为true,则不会反复触发load事件
      // 每当下一页数据请求回来之后，把loading从true给位false
      loading: true,
      // 所有数据是否加载完毕，如果没有更多数据了，一定要把finished改为true
      finished: false,
      isLoading: true
    }
  },
  created() {
    this.inheritAttrs()
  },
  methods: {
    // 封装获取文章列表的数据的方法
    async inheritAttrs(isRefresh) {
      // 发起get请求，获取文章的列表数据
      // const { data: res } = await request.get('/articles', {
      //   params: {
      //     _page: this.page,
      //     _limit: this.limit
      //   }
      // })
      const { data: res } = await getArticleListAPI(this.page, this.limit)
      // console.log(res)

      if (isRefresh) {
        // 证明是下拉刷新，新数据在前，就数据在后
        this.artlist = [...res, ...this.artlist]
        this.isLoading = false
      } else {
        // 如果是上拉加载更多，那么应该是：
        // this.artlist = [旧数组在前，新数组在后]
        this.artlist = [...this.artlist, ...res]
        this.loading = false
        // 证明没有下一页数据了，直接把finished改为true
      }
      if (res.length === 0) {
        this.finished = true
      }
    },
    onLoad() {
      // console.log('ok')
      // 1.让页码值 +1
      this.page++
      // 2.重新请求接口获取数据
      this.inheritAttrs()
    },
    // 下拉刷新
    onRefresh() {
      // console.log('ok')
      // 1.让页码值 +1
      this.page++
      // 2.重新请求接口获取数据
      this.inheritAttrs(true)
    }
  },
  components: { ArticleInfo }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 45px 0 50px 0;
}
</style>
