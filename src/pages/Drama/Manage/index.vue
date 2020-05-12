<template>
  <div id="content" class="content">
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right m-b-20">
      <li class="breadcrumb-item">
        <router-link :to="{name:'welcome'}">
          首页
        </router-link>
      </li>
      <li class="breadcrumb-item">
        <a href="javascript:;">影音电视</a>
      </li>
      <li class="breadcrumb-item active">
        电视管理
      </li>
    </ol>

    <!-- begin row -->
    <div class="">
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">
            电视管理
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
              <div class="form-group width-100 m-r-10">
                <j-select v-model="search.episode_status" title="集数状态" :datas="options.episode" />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.region_id"
                  title="地区"
                  :datas="options.area"
                  value-key="id"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select v-model="search.years_id" title="年份" :datas="options.year" value-key="id" display-key="title" />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select v-model="search.status" title="状态" :datas="options.status" />
              </div>
              <div class="form-group m-r-10">
                <input v-model="search.title" type="text" class="form-control" placeholder="请输入名称">
              </div>
              <j-button type="search" @click="doSearch" />
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
                  <th>集数状态</th>
                  <th class="width-100">
                    地区
                  </th>
                  <th class="width-100">
                    年份
                  </th>
                  <th class="width-100">
                    人气
                  </th>
                  <th class="width-100">
                    评分
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
                    <img :src="toResourceUrl(data.image_path)" @click="$bus.emit('image.show', toResourceUrl(data.image_path))">
                  </td>
                  <td>{{ data.title }}</td>
                  <td>
                    <span
                      class="label"
                      :class="data.episode_status ==='end' ? 'label-pink' : 'label-primary'"
                    >
                      {{ options.episode[data.episode_status] }}
                    </span>
                  </td>
                  <td>{{ data.region.name }}</td>
                  <td>{{ data.years.title }}</td>
                  <td>{{ data.views }}</td>
                  <td>{{ data.score }}</td>
                  <td>
                    <i v-if="data.status === 'Y'" class="fas fa-lg fa-check-circle text-green" />
                    <i v-else class="fas fa-lg fa-times-circle text-danger" />
                  </td>
                  <td>{{ data.created_at }}</td>
                  <td class="text-left">
                    <j-button
                      type="episode"
                      :action="true"
                      @click="$router.push({name: 'drama-episode', params: {id: data.id}, query:{name: data.title}})"
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
  </div>
</template>

<script>
import Enable from 'constants/Enable'
import EpisodeStatus from 'constants/EpisodeStatus'
import ListMixins from 'mixins/List'
import ImageMixins from 'mixins/Image'

export default {
  components: {
    ImageContainer: require('@/Container/Image').default,
    Create: require('./modal/create').default,
    Update: require('./modal/update').default
  },
  mixins: [ListMixins, ImageMixins],
  data: () => ({
    search: {
      status: '',
      title: '',
      episode_status: '',
      region_id: '',
      years_id: ''
    },
    options: {
      episode: EpisodeStatus,
      status: Enable,
      area: [],
      year: [],
      lang: [],
      type: [],
      source: []
    }
  }),
  api: 'drama.manage',
  created () {
    this.getOptions()
    this.doSearch()
  },
  methods: {
    async getOptions () {
      const res = await axios.all([
        this.$thisApi.getAreas(),
        this.$thisApi.getYears(),
        this.$thisApi.getLangs(),
        this.$thisApi.getTypes()
      ])
      this.options = Object.assign({}, this.options, {
        area: res[0].data,
        year: res[1].data,
        lang: res[2].data,
        type: res[3].data
      })
    }
  }
}
</script>
