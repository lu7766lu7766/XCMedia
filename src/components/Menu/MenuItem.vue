<template>
  <li v-if="item.label&&handleHasMenu(item)" :class="{'has-sub':item.children,'closed':!isShowMenu ,'active':getMenuActiveClass(item)}">
    <a v-if="item.children" href="javascript:;">
      <b class="caret" />
      <i v-if="item.icon && item.icon !==''" :class="item.icon" />
      <span> {{ item.label }}</span>
    </a>
    <ul v-if="item.children" class="sub-menu">
      <MenuItem v-for="(x, index) in item.children" :key="index" :item="x" />
    </ul>
    <router-link v-else :to="{name: item.name}">
      <i v-if="item.icon && item.icon !==''" :class="item.icon" /><span>{{ item.label }}</span>
    </router-link>
  </li>
</template>
<script>
import Menu from 'constants/Menu'
import CheckLoginMixins from 'mixins/CheckLogin'
import IndexMixins from 'mixins/Index'
export default {
  name: 'MenuItem',
  mixins: [CheckLoginMixins, IndexMixins],
  props: ['isShowMenu', 'item'],
  data: () => ({
    Menu,
    data: ''
  }),
  mounted () {
  },
  methods: {
    getMenuActiveClass (data) {
      let showActiveClass = false
      const find = function (sitemap, current) {
        for (let i = 0; i < sitemap.length; i++) {
          const site = sitemap[i]
          if (site.name === current) {
            return true
          } else if (site.children) {
            const result = find(site.children, current)
            if (result) {
              return true
            }
          }
        }
      }
      if (data.children) {
        showActiveClass = find(data.children, this.$route.name)
      } else {
        showActiveClass = (data.name === this.$route.name)
      }
      return showActiveClass
    },
    handleHasMenu (data) {
      const result = []
      const find = function (sitemap) {
        for (let i = 0; i < sitemap.length; i++) {
          const site = sitemap[i]
          if (site.hasMenu) {
            result.push(Menu[site.hasMenu])
          }
          if (site.children) {
            find(site.children)
          }
        }
      }
      if (data.hasMenu) {
        result.push(Menu[data.hasMenu])
      }
      if (data.children) {
        find(data.children)
      }
      return this.hasMenu(...result)
    },
    hasMenu (...codes) {
      return _.some(codes, (code) => {
        const menu = _.find(this.menus, { code })
        return menu && _.some(menu.nodes, x => _.endsWith(x.code, '_READ'))
      })
    }
  }
}
</script>>
