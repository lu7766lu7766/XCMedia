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
        <a href="javascript:;">历程记录</a>
      </li>
      <li class="breadcrumb-item active">
        会员登入历程
      </li>
    </ol>
    <!-- end breadcrumb -->

    <!-- begin row -->
    <div class="">
      <!-- begin panel -->
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">
            会员登入历程
          </h4>
        </div>
        <!-- end panel-heading -->
        <!-- begin panel-body -->
        <div class="panel-body">
          <div class="row m-b-20 justify-content-end panel-search-box">
            <div class="col-sm-10 form-inline justify-content-end panel-search">
              <date-time-search-bar :start.sync="search.start" :end.sync="search.end" />

              <div class="form-group width-100 m-r-10">
                <j-select v-model="search.branch_id" title="站台" :datas="options.branches" value-key="id" />
              </div>
              <div class="form-group m-r-10">
                <input v-model="search.account" type="text" class="form-control" placeholder="关键字">
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
                  <th>站台</th>
                  <th>帐号</th>
                  <th>昵称</th>
                  <th class="width-200">
                    登入 IP
                  </th>
                  <th class="width-150">
                    登入时间
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in datas" :key="index">
                  <td>{{ startIndex + index }}</td>
                  <td>{{ data.owner.branch.name }}</td>
                  <td>{{ data.owner.account }}</td>
                  <td>{{ data.owner.display_name }}</td>
                  <td>
                    <a
                      class="text-primary"
                      href="javascript:;"
                      @click="$bus.emit('ip.show', data)"
                    >{{ data.login_ip }}</a>
                  </td>
                  <td>{{ data.updated_at }}</td>
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
    <ip />
  </div>
</template>

<script>
import ListMixins from 'mixins/List'

export default {
  components: {
    ip: require('./modal/ip').default,
    DateTimeSearchBar: require('@/DateTimeSearchBar').default
  },
  mixins: [ListMixins],
  data: () => ({
    search: {
      start: moment().startOf('day').getDateTime(),
      end: moment().endOf('day').getDateTime(),
      branch_id: '',
      account: ''
    },
    options: {
      branches: []
    }
  }),
  api: 'history.member',
  created () {
    this.getOptions()
    this.doSearch()
  },
  methods: {
    async getOptions () {
      const res = await this.$thisApi.getBranches()
      this.options.branches = res.data
    },
    async getList () {
      const res = await this.$thisApi.getList(this.reqBody)
      this.datas = res.data
    },
    async getTotal () {
      const res = await this.$thisApi.getTotal(this.reqBody)
      this.paginate.total = res.data
    }
  }
}
</script>
