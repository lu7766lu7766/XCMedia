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
          <h4 class="text-white m-b-0">集数设定-{{ $route.query.name }}</h4>
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
              <router-link class="btn btn-white" :to="{ name: 'adult-literature-manage' }">
                <i class="fas fa-angle-left"></i>
                返回
              </router-link>
            </div>
          </div>
          <!-- begin table-responsive -->
          <div class="table-responsive">
            <table class="table table-striped table-box text-center">
              <thead>
                <tr>
                  <th class="width-30">#</th>
                  <th>名称</th>
                  <th class="width-150">开放时间</th>
                  <th class="width-100">浏览次数</th>
                  <th class="width-100">状态</th>
                  <th class="width-150">建立时间</th>
                  <th class="width-70">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in datas" :key="index">
                  <td>{{ startIndex + index }}</td>
                  <td>{{ data.title }}</td>
                  <td>{{ data.open_at }}</td>
                  <td>{{ data.views }}</td>
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
import ListMixins from "mixins/List";
import Enable from "constants/Enable";

export default {
  mixins: [ListMixins],
  components: {
    ImageContainer: require("@/Container/Image").default,
    Create: require("./modal/create").default,
    Update: require("./modal/update").default
  },
  data: () => ({
    search: {
      literature_id: ""
    },
    options: {
      status: Enable,
      source: []
    }
  }),
  api: "adult_literature.episode",
  methods: {
    async doDelete(id) {
      await this.doDeleteConfirm();
      await this.$thisApi.doDelete({
        literature_id: this.$route.params.id,
        id: id
      });
      this.deleteSuccess();
    }
  },
  created() {
    this.search.literature_id = this.$route.params.id;
    this.doSearch();
  }
};
</script>
