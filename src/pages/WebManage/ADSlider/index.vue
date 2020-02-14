<template>
  <div id="content" class="content">
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right m-b-20">
      <li class="breadcrumb-item">
        <router-link :to="{name:'welcome'}">首页</router-link>
      </li>
      <li class="breadcrumb-item"><a href="javascript:;">系统设置</a></li>
      <li class="breadcrumb-item active">广告轮播</li>
    </ol>

    <!-- begin row -->
    <div class="">
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">广告轮播</h4>
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
                <j-select title="类型"
                          :datas="options.types"
                          valueKey="id"
                          v-model="search.type_id" />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select title="状态" :datas="options.status" v-model="search.status" />
              </div>
              <div class="form-group m-r-10">
                <input type="text" class="form-control" placeholder="请输入标题" v-model="search.title">
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
                <th>类型</th>
                <th>标题</th>
                <th>连结</th>
                <th class="">发布站台</th>
                <th>点击次数</th>
                <th class="width-100">状态</th>
                <th class="width-150">建立时间</th>
                <th class="width-70">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data, index) in datas" :key="index">
                <td>{{ startIndex + index }}</td>
                <td class="td-img slider-img-td">
                  <img :src="data.image_url" @click="$bus.emit('image.show', data.image_url)">
                </td>
                <td>{{ data.type.name }}</td>
                <td class="text-left">{{ data.title }}</td>
                <td>{{ data.url }}</td>
                <td class="text-left">{{ _.map(data.branches, 'name').join(', ') }}</td>
                <td>{{ data.hits }}</td>
                <td>
                  <i class="fas fa-lg fa-check-circle text-green" v-if="data.status === 'Y'"></i>
                  <i class="fas fa-lg fa-times-circle text-danger" v-else></i>
                </td>
                <td>{{ data.created_at }}</td>
                <td class="text-left">
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
  import Enable from 'constants/Enable'

  export default {
    mixins: [ListMixins],
    components: {
      ImageContainer: require('./modal/image').default,
      Create: require('./modal/create').default,
      Update: require('./modal/update').default,
    },
    data: () => ({
      search: {
        type_id: '',
        status: '',
        title: '',
      },
      options: {
        status: Enable,
        types: [],
        branches: [],
      },
    }),
    api: 'website.adslider',
    methods: {
      async getOptions()
      {
        const res = await axios.all([
          this.$thisApi.getBranches(),
          this.$thisApi.getTypes(),
        ])
        this.options.branches = res[0].data
        this.options.types = res[1].data
      },
    },
    created()
    {
      this.getOptions()
      this.doSearch()
    },
  }
</script>
