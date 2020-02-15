<template>
  <div id="content" class="content">
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right m-b-20">
      <li class="breadcrumb-item">
        <router-link :to="{name:'welcome'}">首页</router-link>
      </li>
      <li class="breadcrumb-item"><a href="javascript:;">系统设置</a></li>
      <li class="breadcrumb-item active">会员管理</li>
    </ol>

    <!-- begin row -->
    <div class="">
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">会员管理</h4>
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
                <select class="form-control" v-model="search.branch">
                  <option value="">站台</option>
                  <option v-for="brnach in options.branch" :key="brnach.id" :value="brnach.id">{{ brnach.name }}</option>
                </select>
              </div>
              <div class="form-group width-100 m-r-10">
                <select class="form-control" v-model="search.status">
                  <option value="">状态</option>
                  <option v-for="(val) in options.status" :key="val" :value="val">
                    {{ $translate('status', val) }}
                  </option>
                </select>
              </div>
              <div class="form-group m-r-10">
                <input type="text" class="form-control" placeholder="请输入帐号/电话/email" v-model="search.keyword">
              </div>
              <j-button type="search" @click="doSearch"></j-button>
            </div>
          </div>
          <!-- begin table-responsive -->
          <div class="table-responsive">
            <table class="table  table-striped table-box text-center">
              <thead>
                <tr>
                  <th class="width-30">#</th>
                  <th class="width-200">站台</th>
                  <th class="width-250">帐号</th>
                  <th>昵称</th>
                  <th>电话</th>
                  <th>Email</th>
                  <th class="width-100">状态</th>
                  <th class="width-150">建立时间</th>
                  <th class="width-100">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in datas" :key="index">
                  <td>{{ startIndex + index }}</td>
                  <td>{{ toBranchName(data.branch_id) }}</td>
                  <td>{{ data.account }}</td>
                  <td>{{ data.display_name }}</td>
                  <td>{{ data.phone || '-' }}</td>
                  <td>{{ data.mail || '-' }}</td>
                  <td>
                    <i class="fas fa-lg fa-check-circle text-green" v-if="data.status === 'enable'"></i>
                    <i class="fas fa-lg fa-times-circle text-danger" v-else></i>
                  </td>
                  <td>{{ data.created_at }}</td>
                  <td class="text-left">
                    <j-button type="log" :action="true" @click="$bus.emit('log.show', data)"></j-button>
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
    <create />
    <update />
    <log />
  </div>
</template>

<script>
import ListMixins from "mixins/List";
import AccountManageStatus from "constants/AccountManageStatus";

export default {
  mixins: [ListMixins],
  components: {
    Create: require("./modal/create").default,
    Update: require("./modal/update").default,
    log: require("./modal/log").default,
  },
  data: () => ({
    search: {
      branch: "",
      status: "",
      keyword: "",
    },
    options: {
      branch: [],
      status: [],
    },
    translate: {
      status: AccountManageStatus,
    }
  }),
  api: "member.manage",
  methods: {
    async getOptions() {
      const {data: branch} = await this.$thisApi.getBranches();
      const {data: status} = await this.$thisApi.getStatuses();
      this.options = Object.assign({}, this.options, {
        branch,
        status,
      })
    },
    dataInit() {
      this.getOptions();
    },
    toBranchName(id) {
      let i = _.findIndex(this.options.branch, {id})
      return i > -1 ? this.options.branch[i].name : '?'
    }
  },
  created() {
    this.dataInit();
    this.doSearch();
  }
};
</script>
