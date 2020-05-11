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
        <a href="javascript:;">采集管理</a>
      </li>
      <li class="breadcrumb-item active">
        采集设定
      </li>
    </ol>

    <!-- begin row -->
    <div class="">
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">
            采集设定
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
                <j-select v-model="search.status" title="状态" :datas="options.status" />
              </div>
              <div class="form-group m-r-10">
                <input v-model="search.name" type="text" class="form-control" placeholder="请输入名称">
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
                  <th>资源名称 </th>
                  <th>采集类型</th>
                  <th>采集平台</th>
                  <th class="width-100">
                    状态
                  </th>
                  <th class="width-150">
                    建立时间
                  </th>
                  <th class="width-70">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in datas" :key="index">
                  <td>{{ startIndex + index }}</td>
                  <td class="text-left">
                    {{ transformByID(options.source, data.collector_source_id) }}
                  </td>
                  <td class="text-left">
                    {{ data.type.map(t => t.title).join(',') }}
                  </td>
                  <td class="text-left">
                    {{ data.platform.map(t => t.title).join(',') }}
                  </td>
                  <td>
                    <i v-if="data.status === 'Y'" class="fas fa-lg fa-check-circle text-green" />
                    <i v-else class="fas fa-lg fa-times-circle text-danger" />
                  </td>
                  <td>{{ data.created_at }}</td>
                  <td class="text-left">
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
  </div>
</template>

<script>
import Enable from 'constants/Enable'
import ListMixins from 'mixins/List'
import UtilsMixins from 'mixins/Utils'

export default {
  components: {
    Create: require('./modal/create').default,
    Update: require('./modal/update').default
  },
  mixins: [ListMixins, UtilsMixins],
  data: () => ({
    search: {
      name: '',
      status: ''
    },
    options: {
      status: Enable,
      source: [],
      type: [],
      platform: []
    }
  }),
  api: 'collection.setting',
  created () {
    this.getOptions()
    this.doSearch()
  },
  methods: {
    async getSource () {
      const res = await this.$thisApi.getSource()
      this.options.source = res.data
    },
    async getType () {
      const res = await this.$thisApi.getType()
      this.options.type = res.data
    },
    async getPlatform () {
      const res = await this.$thisApi.getPlatform()
      this.options.platform = res.data
    },
    async getOptions () {
      await Promise.all([this.getSource(), this.getType(), this.getPlatform()])
    }
  }
}
</script>
