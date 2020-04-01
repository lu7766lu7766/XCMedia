<template>
  <div id="content" class="content">
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right m-b-20">
      <li class="breadcrumb-item">
        <router-link :to="{ name: 'welcome' }">首页</router-link>
      </li>
      <li class="breadcrumb-item">
        <a href="javascript:;">成人文学</a>
      </li>
      <li class="breadcrumb-item active">文学管理</li>
    </ol>

    <!-- begin row -->
    <div class>
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">文学管理</h4>
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
                <j-select
                  title="地区"
                  :datas="options.area"
                  valueKey="id"
                  v-model="search.region_id"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select
                  title="年份"
                  :datas="options.year"
                  valueKey="id"
                  displayKey="title"
                  v-model="search.year_id"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select title="状态" :datas="options.status" v-model="search.status" />
              </div>
              <div class="form-group m-r-10">
                <input type="text" class="form-control" placeholder="请输入名称" v-model="search.title" />
              </div>
              <j-button type="search" @click="doSearch"></j-button>
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
                  <th>类型</th>
                  <th class="width-100">年份</th>
                  <th class="width-100">浏览次数</th>
                  <th class="width-100">状态</th>
                  <th class="width-150">建立时间</th>
                  <th class="width-100">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in datas" :key="index">
                  <td>{{ startIndex + index }}</td>
                  <td class="td-img slider-img-td">
                    <img :src="data.cover_url" @click="$bus.emit('image.show', data.cover_url)" />
                  </td>
                  <td>{{ data.title }}</td>
                  <td>{{ data.region.name}}</td>
                  <!-- <td>{{ data.region.title }}</td> -->
                  <td>
                    <span
                      class="label label-warning"
                      style="margin-right:5px"
                      v-for="(area, index) in data.genres"
                      :key="index"
                    >
                      {{
                      area.title
                      }}
                    </span>
                  </td>

                  <td>{{ data.year.title }}</td>
                  <td>{{ data.views }}</td>
                  <td>
                    <i class="fas fa-lg fa-check-circle text-green" v-if="data.status === 'Y'"></i>
                    <i class="fas fa-lg fa-times-circle text-danger" v-else></i>
                  </td>
                  <td>{{ data.created_at }}</td>
                  <td class="text-left">
                    <j-button
                      type="episode-book"
                      :action="true"
                      @click="$router.push({ name: 'adult-literature-episode', params: { id: data.id }, query: { name: data.title } })"
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
import ListMixins from "mixins/List";
import Enable from "constants/Enable";
import EpisodeStatus from "constants/EpisodeStatus";

export default {
  mixins: [ListMixins],
  components: {
    ImageContainer: require("@/Container/Image").default,
    Create: require("./modal/create").default,
    Update: require("./modal/update").default
  },
  data: () => ({
    search: {
      status: "",
      title: "",
      region_id: "",
      year_id: ""
    },
    options: {
      status: Enable,
      area: [],
      year: [],
      type: []
    }
  }),
  api: "adult_literature.manage",
  methods: {
    async getOptions() {
      const res = await axios.all([
        this.$thisApi.getAreas(),
        this.$thisApi.getYears(),
        this.$thisApi.getTypes()
      ]);
      this.options = Object.assign({}, this.options, {
        area: res[0].data,
        year: res[1].data,
        type: res[2].data
      });
    }
  },
  created() {
    this.getOptions();
    this.doSearch();
  }
};
</script>
