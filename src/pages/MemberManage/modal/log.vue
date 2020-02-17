<template>
  <detail :title="`登入纪录-${account}`" :hideFooter="true">
    <div class="table-responsive">
      <table class="table table-striped table-box text-center">
        <thead>
        <tr>
          <th class="width-30">#</th>
          <th class="width-150">时间</th>
          <th>IP</th>
          <th>地区</th>
          <th>电信</th>
          <th>装置</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(data, index) in historys" :key="index">
          <td>{{ startIndex + index }}</td>
          <td>{{ data.created_at }}</td>
          <td>{{ data.login_ip }}</td>
          <td>{{ data.location }}</td>
          <td>{{ data.isp }}</td>
          <td><span class="text-danger">{{ data.device }}</span></td>
        </tr>

        </tbody>
      </table>
    </div>
    <paginate :page="paginate.page" :lastPage="lastPage" @pageChange="pageChange" />

  </detail>
</template>

<script>
  import DetailMixins from 'mixins/Detail'
  import ListMixins from 'mixins/List'

  export default {
    mixins: [ListMixins, DetailMixins],
    methods: {},
    data()
    {
      return {
        account: '',
        historys: [],
      }
    },
    methods: {
      async getHistorys(_data)
      {
        let data = Object.assign({}, this.paginate, {id: _data.id})
        let {data: historys} = await this.$thisApi.getLoginHistorys(data)
        this.historys = historys
      },
    },
    mounted()
    {
      this.$bus.on('log.show', (data) =>
      {
        this.account = data.account
        this.getHistorys(data)
        this.show()
      })
    },
    destroyed()
    {
      this.$bus.off('log.show')
    },
  }
</script>
