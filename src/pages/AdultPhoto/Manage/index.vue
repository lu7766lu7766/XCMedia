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
        <a href="javascript:;">成人写真</a>
      </li>
      <li class="breadcrumb-item active">
        写真管理
      </li>
    </ol>

    <!-- begin row -->
    <div class="">
      <div class="panel panel-inverse" style="clear: both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">
            写真管理
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
                <j-select
                  v-model="search.area"
                  title="地区"
                  :datas="options.areas"
                  value-key="id"
                  display-key="title"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.girl"
                  title="女优"
                  :datas="options.girls"
                  value-key="id"
                  display-key="title"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.cup"
                  title="罩杯"
                  :datas="options.cups"
                  value-key="id"
                  display-key="title"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.year"
                  title="年份"
                  :datas="options.years"
                  value-key="id"
                  display-key="title"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select v-model="search.status" title="状态" :datas="options.statuses" />
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
                  <th>罩杯</th>
                  <th>类型</th>
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
                <tr v-for="(data, index) in list" :key="index">
                  <td>{{ startIndex + index }}</td>
                  <td class="td-img slider-img-td">
                    <img :src="data.imgUrl" @click="$bus.emit('image.show', data.imgUrl)">
                  </td>
                  <td>{{ data.title }}</td>
                  <td>{{ data.area.title }}</td>
                  <td>
                    <span
                      v-for="(t, i) in data.girls"
                      :key="i"
                      style="margin-right:5px"
                    >{{ t.title }}</span>
                  </td>
                  <td>{{ data.cup.title }}</td>
                  <td>
                    <span
                      v-for="(item, i) in data.types"
                      :key="i"
                      class="label label-warning"
                      style="margin-right: 5px;"
                    >{{ item.title }}</span>
                  </td>

                  <td>{{ data.year.title }}</td>
                  <td>{{ data.views }}</td>
                  <td>
                    <i v-if="data.status === 'Y'" class="fas fa-lg fa-check-circle text-green" />
                    <i v-else class="fas fa-lg fa-times-circle text-danger" />
                  </td>
                  <td>{{ data.createdAt }}</td>
                  <td class="text-left">
                    <j-button
                      type="image"
                      :action="true"
                      @click="$router.push({
                        name: 'adult-photo-photo',
                        params: { id: data.id },
                        query: { name: data.title },
                      })"
                    />
                    <j-button
                      type="edit"
                      :action="true"
                      @click="$bus.emit('update.show', data)"
                    />
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
      area: '',
      girl: '',
      cup: '',
      year: '',
      status: '',
      keyword: ''
    },
    options: {
      statuses: Enable,
      areas: [],
      years: [],
      types: [],
      girls: [],
      cups: []
    }
  }),
  computed: {
    list () {
      return this.datas.map(t => ({
        id: t.id,
        title: t.title,
        imgUrl: this.toResourceUrl(t.cover_path),
        alias: t.alias,
        area: {
          id: t.region.id,
          title: t.region.name
        },
        girls: t.actress.map(t => ({
          id: t.id,
          title: t.name
        })),
        cup: {
          id: t.cup.id,
          title: t.cup.size
        },
        cupID: t.cup.id,
        types: t.genres.map(t => ({
          id: t.id,
          title: t.title
        })),
        year: {
          id: t.years.id,
          title: t.years.title
        },
        tags: t.tags,
        desc: t.description,
        status: t.status,
        views: t.views,
        createdAt: t.created_at
      }))
    }
  },
  api: 'adult_photo.manage',
  async created () {
    await this.getOptions()
    await this.doSearch()
  },
  methods: {
    doSubmit () {
      const _d = this.search
      const data = {
        region_id: _d.area || undefined,
        av_actress_ids: _d.girl ? [_d.girl] : undefined,
        cup_id: _d.cup || undefined,
        years_id: _d.year || undefined,
        status: _d.status || undefined,
        // genres_ids: _d.type ? [_d.type] : undefined,
        keyword: _d.keyword || undefined
      }
      this.doSearch({ ...data, ...this.paginate })
    },
    async getArea () {
      const res = await this.$thisApi.getAreas()
      this.options.areas = res.data.map(t => ({
        id: t.id,
        title: t.name
      }))
    },
    async getYears () {
      const res = await this.$thisApi.getYears()
      this.options.years = res.data.map(t => ({
        id: t.id,
        title: t.title
      }))
    },
    async getTypes () {
      const res = await this.$thisApi.getTypes()
      this.options.types = res.data.map(t => ({
        id: t.id,
        title: t.title
      }))
    },
    async getActress () {
      const res = await this.$thisApi.getActress()
      this.options.girls = res.data.map(t => ({
        id: t.id,
        title: t.name
      }))
    },
    async getCups () {
      const res = await this.$thisApi.getCups()
      this.options.cups = res.data.map(t => ({
        id: t.id,
        title: t.size
      }))
    },
    async getOptions () {
      await Promise.all([
        this.getArea(),
        this.getYears(),
        this.getCups(),
        this.getActress(),
        this.getTypes()
      ])
    }
  }
}
</script>
