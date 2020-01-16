<template>
  <detail title="权限" @submit="doSubmit()">

    <ul class="limit-main">
      <!-- 系统设置' -->
      <li v-if="inAllNodes(Menu.ROLE_MG, Menu.ACCOUNT_MG)">
        <permission-node title="系统设置"
                         className="fas fa-cog text-black"
                         :values="getAllSubNodeID([
                            findNode(Menu.ROLE_MG),
                            findNode(Menu.ACCOUNT_MG)
                         ])"
                         v-model="data.nodes" />

        <ul class="limit-sub">
          <permission-tree :node="findNode(Menu.ROLE_MG)" v-model="data.nodes" />
          <permission-tree :node="findNode(Menu.ACCOUNT_MG)" v-model="data.nodes" />
        </ul>
        <!-- limit-sub end -->
      </li>
      <!-- 职级管理' -->
      <li v-if="inAllNodes(Menu.COMPANY_ACCOUNT, Menu.MANAGER_ACCOUNT, Menu.EMPLOYEE_ACCOUNT)">
        <permission-node title="职级管理"
                         className="fas fa-folder text-black"
                         :values="getAllSubNodeID([
                            findNode(Menu.COMPANY_ACCOUNT),
                            findNode(Menu.MANAGER_ACCOUNT),
                            findNode(Menu.EMPLOYEE_ACCOUNT),
                         ])"
                         v-model="data.nodes" />

        <ul class="limit-sub">
          <permission-tree :node="findNode(Menu.COMPANY_ACCOUNT)" v-model="data.nodes" />
          <permission-tree :node="findNode(Menu.MANAGER_ACCOUNT)" v-model="data.nodes" />
          <permission-tree :node="findNode(Menu.EMPLOYEE_ACCOUNT)" v-model="data.nodes" />
        </ul>
        <!-- limit-sub end -->
      </li>
      <!-- 公司设定 -->
      <permission-tree className="fas fa-columns text-black"
                       :node="findNode(Menu.COMPANY_SETTING)"
                       v-model="data.nodes" />

      <!-- 币别设定 -->
      <permission-tree className="fas fa-sync text-black"
                       :node="findNode(Menu.CURRENCY_SETTING)"
                       v-model="data.nodes" />

      <!-- 汇率管理' -->

      <li v-if="inAllNodes(Menu.EXCHANGE_SETTING, Menu.EXCHANGE_RATE_SETTING)">
        <permission-node title="汇率管理"
                         className="fas fa-table text-black"
                         :values="getAllSubNodeID([
                            findNode(Menu.EXCHANGE_SETTING),
                            findNode(Menu.EXCHANGE_RATE_SETTING)
                         ])"
                         v-model="data.nodes" />

        <ul class="limit-sub">
          <permission-tree :node="findNode(Menu.EXCHANGE_SETTING)" v-model="data.nodes" />
          <permission-tree :node="findNode(Menu.EXCHANGE_RATE_SETTING)" v-model="data.nodes" />

        </ul>
        <!-- limit-sub end -->
      </li>
      <!-- 银行管理' -->
      <li v-if="inAllNodes(Menu.ACCOUNT_SETTING)">
        <permission-node title="银行管理"
                         className="fas fa-database text-black"
                         :values="getAllSubNodeID([
                            findNode(Menu.ACCOUNT_SETTING),
                         ])"
                         v-model="data.nodes" />

        <ul class="limit-sub">
          <permission-tree :node="findNode(Menu.ACCOUNT_SETTING)" v-model="data.nodes" />

        </ul>
        <!-- limit-sub end -->
      </li>
      <!-- 订单管理' -->
      <li v-if="inAllNodes(Menu.ORDER_APPLY, Menu.ORDER_VERIFY)">
        <permission-node title="订单管理"
                         className="fas fa-copy text-black"
                         :values="getAllSubNodeID([
                            findNode(Menu.ORDER_APPLY),
                            findNode(Menu.ORDER_VERIFY)
                         ])"
                         v-model="data.nodes" />

        <ul class="limit-sub">
          <permission-tree :node="findNode(Menu.ORDER_APPLY)" v-model="data.nodes" />
          <permission-tree :node="findNode(Menu.ORDER_VERIFY)" v-model="data.nodes" />

        </ul>
        <!-- limit-sub end -->
      </li>
      <!-- 历程记录' -->
      <li v-if="inAllNodes(Menu.ACCOUNT_LOGIN_HISTORY)">
        <permission-node title="历程记录"
                         className="fas fa-history text-black"
                         :values="getAllSubNodeID([
                            findNode(Menu.ACCOUNT_LOGIN_HISTORY),
                         ])"
                         v-model="data.nodes" />

        <ul class="limit-sub">
          <permission-tree :node="findNode(Menu.ACCOUNT_LOGIN_HISTORY)" v-model="data.nodes" />

        </ul>
        <!-- limit-sub end -->
      </li>
    </ul>

  </detail>
</template>

<script>
  import IndexMixins from 'mixins/Index'
  import DetailMixins from 'mixins/Detail'
  import Menu from 'constants/Menu'
  import { JacLib } from 'jactools'

  export default {
    mixins: [IndexMixins, DetailMixins],
    components: {
      PermissionNode: () => import('@/Permission/Node'),
      PermissionTree: () => import('@/Permission/Tree'),
    },
    data: () => ({
      thisOptions: {
        Nodes: {
          All: [],
          Own: [],
        },
      },
      data: {
        id: '',
        nodes: [],
      },
      Menu,
    }),
    methods: {
      async getAllNodes()
      {
        const res = await this.$thisApi.getAllNodes()
        this.thisOptions.Nodes.All = res.data
      },
      async getOwnNodes(id)
      {
        const res = await this.$thisApi.getOwnNodes({id})
        this.thisOptions.Nodes.Own = res.data
      },
      inAllNodes(...codes)
      {
        for (const code of codes)
        {
          if (_.some(this.thisOptions.Nodes.All, {code}))
          {
            return true
          }
        }
        return false
      },
      findNode(code)
      {
        return _.find(this.thisOptions.Nodes.All, {code})
      },
      getAllSubNodeID: JacLib.getAllSubNodeID,
      async doSubmit()
      {
        await this.$thisApi.doBind(this.data)
        this.getNodes()
        this.$alert.success(`绑定成功`)
        this.$modal.hide()
      },
    },
    mounted()
    {
      this.$bus.on('permission.show', async id =>
      {
        this.getAllNodes()
        await this.getOwnNodes(id)
        this.data.id = id
        setTimeout(() =>
        {
          this.data.nodes = _.chain(this.thisOptions.Nodes.Own).map('nodes').reduce((result, node) =>
          {
            return result.concat(_.map(node, 'id'))
          }, []).value()
        })
        this.show()
      })
    },
    destroyed()
    {
      this.$bus.off('permission.show')
    },
  }
</script>