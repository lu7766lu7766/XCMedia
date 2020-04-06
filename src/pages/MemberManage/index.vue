<template>
  <div id="content" class="content">
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right m-b-20">
      <li class="breadcrumb-item">
        <router-link :to="{name:'welcome'}">
          首页
        </router-link>
      </li>
      <li class="breadcrumb-item active">
        会员管理
      </li>
    </ol>

    <!-- begin row -->
    <div class="">
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">
            会员管理
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
                <j-select v-model="search.branch_id" title="站台" :datas="options.branch" value-key="id" />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select v-model="search.status" title="状态" :translate="translate.status" :datas="options.status" />
              </div>
              <div class="form-group m-r-10">
                <input v-model="search.keyword" type="text" class="form-control" placeholder="请输入帐号/电话/email">
              </div>
              <j-button type="search" @click="doSearch" />
            </div>
          </div>
          <!-- begin table-responsive -->
          <div class="table-responsive">
            <table class="table  table-striped table-box text-center">
              <thead>
                <tr>
                  <th class="width-30">
                    #
                  </th>
                  <th class="width-200">
                    站台
                  </th>
                  <th class="width-250">
                    帐号
                  </th>
                  <th>昵称</th>
                  <th>电话</th>
                  <th>Email</th>
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
                  <td>{{ _.getVal(_.find(options.branch, {id: data.branch_id}), 'name', '-') }}</td>
                  <td>{{ data.account }}</td>
                  <td>{{ data.display_name }}</td>
                  <td><span :class="data.phone_approve ==='Y' ? 'text-green': ''">{{ data.phone || '-' }}</span></td>
                  <td><span :class="data.mail_approve ==='Y' ? 'text-green': ''">{{ data.mail || '-' }}</span></td>
                  <td>
                    <i v-if="data.status === 'enable'" class="fas fa-lg fa-check-circle text-green" />
                    <i v-else class="fas fa-lg fa-times-circle text-danger" />
                  </td>
                  <td>{{ data.created_at }}</td>
                  <td class="text-left">
                    <j-button type="log" :action="true" @click="$bus.emit('log.show', data)" />
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
    <create />
    <update />
    <log />
  </div>
</template>

<script>
import Status from 'constants/AccountManageStatus'
import ListMixins from 'mixins/List'

export default {
  components: {
    Create: require('./modal/create').default,
    Update: require('./modal/update').default,
    log: require('./modal/log').default
  },
  mixins: [ListMixins],
  data: () => ({
    search: {
      branch_id: '',
      status: '',
      keyword: ''
    },
    options: {
      branch: [],
      status: []
    },
    translate: {
      status: Status
    }
  }),
  api: 'member.manage',
  created () {
    this.getOptions()
    this.doSearch()
  },
  methods: {
    async getOptions () {
      const res = await axios.all([this.$thisApi.getBranches(), this.$thisApi.getStatuses()])
      this.options = {
        branch: res[0].data,
        status: res[1].data
      }
    }
  }
}
</script>
