<template>
  <li v-if="node">
    <permission-node :className="className ? className : null"
                     :title="node.display_name"
                     :values="values"
                     :hasChild="!!node.nodes"
                     v-model="data" />
    <ul class="limit-sub" v-if="node.nodes">
      <permission-tree v-for="(n, index) in node.nodes" :key="index" :node="n" v-model="data" />
    </ul>
  </li>
</template>

<script>
  import { JacLib } from 'jactools'

  export default {
    props: ['node', 'value', 'className'],
    components: {
      PermissionNode: () => import('@/Permission/Node'),
      PermissionTree: () => import('@/Permission/Tree'),
    },
    data: () => ({
      data: [],
    }),
    computed: {
      values()
      {
        return this.node.nodes
          ? JacLib.getAllSubNodeID(this.node.nodes)
          : [this.node.id]
      },
    },
    watch: {
      data()
      {
        this.$emit('input', this.data)
      },
      value()
      {
        this.data = this.value
      },
    },
    mounted()
    {
      this.data = this.value
    },
  }
</script>
