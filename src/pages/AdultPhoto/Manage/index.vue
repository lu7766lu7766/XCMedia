<template>
  <div id="content" class="content">
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right m-b-20">
      <li class="breadcrumb-item">
        <router-link :to="{ name: 'welcome' }">首页</router-link>
      </li>
      <li class="breadcrumb-item"><a href="javascript:;">成人写真</a></li>
      <li class="breadcrumb-item active">写真管理</li>
    </ol>

    <!-- begin row -->
    <div class="">
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">写真管理</h4>
        </div>
        <!-- end panel-heading -->
        <!-- begin panel-body -->
        <div class="panel-body">
          <alert />
          <div class="row m-b-20 justify-content-end panel-search-box">
            <div class="col-sm-2">
              <j-button type="add" @click="$bus.emit('create.show')"></j-button>
            </div>
            <div class="col-sm-10 form-inline justify-content-end panel-search">
              <div class="form-group width-100 m-r-10">
                <j-select title="地区" :datas="options.areas" valueKey="id" displayKey="title"  v-model="search.area" />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select title="女优" :datas="options.girls" valueKey="id" displayKey="title" v-model="search.girl" />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select title="罩杯" :datas="options.cups" valueKey="id" displayKey="title" v-model="search.cup" />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select title="年份" :datas="options.years" valueKey="id" displayKey="title" v-model="search.year" />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select title="状态" :datas="options.statuses" v-model="search.status" />
              </div>
              <div class="form-group m-r-10">
                <input type="text" class="form-control" placeholder="请输入名称" v-model="search.keyword" />
              </div>
              <j-button type="search" @click="doSubmit"></j-button>
            </div>
          </div>
          <!-- begin table-responsive -->
          <div class="table-responsive">
            <table class="table table-striped table-box text-center">
              <thead>
                <tr>
                  <th class="width-30">#</th>
                  <th class="width-200">图片</th>
                  <th>名称</th>
                  <th class="width-100">地区</th>
                  <!-- <th>女优</th> -->
                  <th class="width-100">罩杯</th>
                  <th class="width-100">类型</th>
                  <th class="width-100">年份</th>
                  <th class="width-100">浏览次数</th>
                  <th class="width-100">状态</th>
                  <th class="width-150">建立时间</th>
                  <th class="width-100">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in list" :key="index">
                  <td>{{ startIndex + index }}</td>
                  <td class="td-img slider-img-td">
                    <img :src="data.imgUrl" @click="$bus.emit('image.show', data.imgUrl)" />
                  </td>
                  <td>{{ data.title }}</td>
                  <td>{{ data.area.title }}</td>
                  <!-- <td>
                    <span style="margin-right:5px" v-for="(i, index) in data.actress" :key="index">{{ i.name }}</span>
                  </td> -->
                  <td>{{ data.cup.title }}</td>
                  <td>
                    <span class="label label-warning" style="margin-right:5px" v-for="(item, index) in data.types" :key="index">{{
                      item.title
                    }}</span>
                  </td>

                  <td>{{ data.year.title }}</td>
                  <td>{{ data.views }}</td>
                  <td>
                    <i class="fas fa-lg fa-check-circle text-green" v-if="data.status === 'Y'"></i>
                    <i class="fas fa-lg fa-times-circle text-danger" v-else></i>
                  </td>
                  <td>{{ data.createdAt }}</td>
                  <td class="text-left">
                    <j-button
                      type="image"
                      :action="true"
                      @click="$router.push({ name: 'adult-photo-photo', params: { id: data.id }, query: { name: data.title } })"
                    ></j-button>
                    <j-button type="edit" :action="true" @click="$bus.emit('update.show', data)"></j-button>
                    <j-button type="delete" :action="true" @click="doDelete(data.id)"></j-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- end table-responsive -->
          <!-- pagination -->
          <paginate :page="paginate.page" :lastPage="lastPage" @pageChange="pageChange" />
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
import ListMixins from 'mixins/List'
import ImageMixins from 'mixins/Image'
import Enable from 'constants/Enable'
import CensoredStatus from 'constants/CensoredStatus'

export default {
  mixins: [ListMixins, ImageMixins],
  components: {
    ImageContainer: require('@/Container/Image').default,
    Create: require('./modal/create').default,
    Update: require('./modal/update').default,
  },
  data: () => ({
    search: {
      area: '',
      girl: '',
      cup: '',
      year: '',
      status: '',
      keyword: '',
    },
    options: {
      statuses: Enable,
      areas: [],
      years: [],
      types: [],
      girls: [],
      cups: [],
    },
  }),
  computed: {
    list() {
      return this.datas.map(t => ({
        id: t.id,
        title: t.title,
        imgUrl: this.toResourceUrl(t.cover_path),
        alias: t.alias,
        area: {
          id: t.region.id,
          title: t.region.name,
        },
        girls: t.actress.map(t => ({
          id: t.id,
          title: t.name
        })),
        cup: {
          id: t.cup.id,
          title: t.cup.size,
        },
        cupID: t.cup.id,
        types: t.genres.map(t => ({
          id: t.id,
          title: t.title
        })),
        year: {
          id: t.years.id,
          title: t.years.title,
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
  methods: {
    async doSubmit() {
      const _d = this.search
      const data = {
        region_id: _d.area || undefined,
        av_actress_ids: _d.girl ? [_d.girl] : undefined,
        cup_id: _d.cup || undefined,
        years_id: _d.year || undefined,
        status: _d.status || undefined,
        // genres_ids: _d.type ? [_d.type] : undefined,
        keyword: _d.keyword || undefined,
      }
      this.doSearch({...data, ...this.paginate})
    },
    async getArea() {
      const res = await this.$thisApi.getAreas()
      this.options.areas = res.data.map(t => ({
        id: t.id,
        title: t.name,
      }))
    },
    async getYears() {
      const res = await this.$thisApi.getYears()
      this.options.years = res.data.map(t => ({
        id: t.id,
        title: t.title,
      }))
    },
    async getTypes() {
      const res = await this.$thisApi.getTypes()
      this.options.types = res.data.map(t => ({
        id: t.id,
        title: t.title,
      }))
    },
    async getActress() {
      const res = await this.$thisApi.getActress()
      this.options.girls = res.data.map(t => ({
        id: t.id,
        title: t.name,
      }))
    },
    async getCups() {
      const res = await this.$thisApi.getCups()
      this.options.cups = res.data.map(t => ({
        id: t.id,
        title: t.size,
      }))
    },
    async getOptions() {
      await Promise.all([
        this.getArea(),
        this.getYears(),
        this.getCups(),
        this.getActress(),
        this.getTypes(),
      ])
    },
  },
  async created() {
    await this.getOptions()
    await this.doSearch()
  },
}
</script>
