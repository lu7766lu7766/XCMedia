<template>
  <div id="content" class="content">
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right m-b-20">
      <li class="breadcrumb-item">
        <router-link :to="{ name: 'welcome' }">
          首页
        </router-link>
      </li>
      <li class="breadcrumb-item">
        <a href="javascript:;">成人视频</a>
      </li>
      <li class="breadcrumb-item active">
        视频管理
      </li>
    </ol>

    <!-- begin row -->
    <div class>
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">
            视频管理
          </h4>
        </div>
        <!-- end panel-heading -->
        <!-- begin panel-body -->
        <div class="panel-body">
          <alert />
          <div class="row m-b-20 justify-content-end panel-search-box">
            <div class="col-sm-2">
              <j-button type="add" @click="$bus.emit('create.show')" />
            </div>
            <div class="col-sm-10 form-inline justify-content-end panel-search">
              <!-- <div class="form-group width-100 m-r-10">
                <j-select title="片种" :datas="options.episode" v-model="search.is_censored" />
              </div>-->
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.region_id"
                  title="地区"
                  :datas="options.area"
                  value-key="id"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="av_actress_id"
                  title="女优"
                  :datas="options.actress"
                  value-key="id"
                  display-key="name"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.cup_id"
                  title="罩杯"
                  :datas="options.cup"
                  value-key="id"
                  display-key="size"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.years_id"
                  title="年份"
                  :datas="options.year"
                  value-key="id"
                  display-key="title"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select v-model="search.status" title="状态" :datas="options.status" />
              </div>
              <div class="form-group m-r-10">
                <input
                  v-model="search.keyword"
                  type="text"
                  class="form-control"
                  placeholder="请输入名称"
                >
              </div>
              <j-button type="search" @click="doSubmit" />
            </div>
          </div>
          <!-- begin table-responsive -->
          <div class="table-responsive">
            <table class="table table-striped table-box text-center">
              <thead>
                <tr>
                  <th class="width-30">
                    #
                  </th>
                  <th class="width-200">
                    图片
                  </th>
                  <th>名称</th>
                  <th class="width-100">
                    地区
                  </th>
                  <th>女优</th>
                  <th class="width-100">
                    罩杯
                  </th>
                  <th class="width-100">
                    类型
                  </th>
                  <th class="width-100">
                    年份
                  </th>
                  <th class="width-100">
                    浏览次数
                  </th>
                  <th class="width-100">
                    状态
                  </th>
                  <th class="width-150">
                    建立时间
                  </th>
                  <th class="width-100">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in datas" :key="index">
                  <td>{{ startIndex + index }}</td>
                  <td class="td-img slider-img-td">
                    <img :src="data.cover_url" @click="$bus.emit('image.show', data.cover_url)">
                  </td>
                  <td>{{ data.title }}</td>
                  <!-- <td>
                    <span
                      class="label"
                      :class="data.is_censored === 'Y' ? 'text-green' : 'text-danger'"
                    >{{ options.episode[data.is_censored] }}</span>
                  </td>-->
                  <td>{{ data.source.name }}</td>
                  <td>
                    <span
                      v-for="(i, index) in data.actress"
                      :key="index"
                      style="margin-right:5px"
                    >{{ i.name }}
                      <span v-if="index!==data.actress.length-1">,</span>
                    </span>
                  </td>
                  <td>{{ data.cup.size }}</td>
                  <td>
                    <span
                      v-for="(area, index) in data.genres"
                      :key="index"
                      class="label label-warning"
                      style="margin-right:5px"
                    >
                      {{
                        area.title
                      }}
                    </span>
                  </td>

                  <td>{{ data.years.title }}</td>
                  <td>{{ data.views }}</td>
                  <td>
                    <i v-if="data.status === 'Y'" class="fas fa-lg fa-check-circle text-green" />
                    <i v-else class="fas fa-lg fa-times-circle text-danger" />
                  </td>
                  <td>{{ data.created_at }}</td>
                  <td class="text-left">
                    <!--   <j-button
                      type="episode"
                      :action="true"
                      @click="$router.push({ name: 'av-episode', params: { id: data.id }, query: { name: data.title } })"
                    ></j-button>-->
                    <j-button
                      type="episode"
                      :action="true"
                      @click="$bus.emit('video_update.show', data)"
                    />
                    <j-button type="edit" :action="true" @click="$bus.emit('update.show', data)" />
                    <j-button type="delete" :action="true" @click="doDelete(data.id)" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- end table-responsive -->
          <!-- pagination -->
          <paginate :page="paginate.page" :last-page="lastPage" @pageChange="pageChange" />
          <!-- end pagination -->
        </div>
      </div>
    </div>
    <image-container />
    <create />
    <update />
    <VideoUpdate />
  </div>
</template>

<script>
import Enable from 'constants/Enable'
import CensoredStatus from 'constants/CensoredStatus'
import ListMixins from 'mixins/List'

export default {
  mixins: [ListMixins],
  components: {
    ImageContainer: require('@/Container/Image').default,
    Create: require('./modal/create').default,
    Update: require('./modal/update').default,
    VideoUpdate: require('./modal/videoUpdate').default
  },
  data: () => ({
    av_actress_id: '',
    search: {
      // is_censored: "",
      region_id: '',
      av_actress_ids: [],
      cup_id: '',
      years_id: '',
      status: '',
      keyword: ''
    },
    options: {
      // episode: CensoredStatus,
      status: Enable,
      area: [],
      year: [],
      type: [],
      actress: [],
      cup: []
    }
  }),
  api: 'av.manage',
  created () {
    this.getOptions()
    this.doSearch()
  },
  methods: {
    async doSubmit () {
      if (this.av_actress_id) {
        this.search.av_actress_ids = []
        this.search.av_actress_ids.push(this.av_actress_id)
      } else {
        this.search.av_actress_ids = []
      }
      this.doSearch()
    },
    async getOptions () {
      const res = await axios.all([
        this.$thisApi.getAreas(),
        this.$thisApi.getYears(),
        this.$thisApi.getTypes(),
        this.$thisApi.getActress(),
        this.$thisApi.getCups()
        // this.$thisApi.getStatus(),
      ])
      this.options = Object.assign({}, this.options, {
        area: res[0].data,
        year: res[1].data,
        type: res[2].data,
        actress: res[3].data,
        cup: res[4].data
        // status: res[5].data,
      })
    }
  }
}
</script>
