<template>
  <li v-if="item.label&&handleHasMenu(item)" v-bind:class="{'has-sub':item.children,'closed':!isShowMenu ,'active':getMenuActiveClass(item)}">
    <a href="javascript:;" v-if="item.children">
         <b class="caret"></b>
         <i v-if="item.icon && item.icon !==''" :class="item.icon"></i>
         <span> {{item.label}}</span>
    </a>
    <ul class="sub-menu"  v-if="item.children">
       <MenuItem :item="x" :key="index" v-for="(x, index) in item.children">
      </MenuItem>
    </ul>
    <router-link v-else :to="{name: item.name}">
      <i v-if="item.icon && item.icon !==''" :class="item.icon"></i><span>{{item.label}}</span>
    </router-link>
  </li>
</template>
<script>
import CheckLoginMixins from 'mixins/CheckLogin'
import IndexMixins from 'mixins/Index'
import Menu from 'constants/Menu'
export default {
    name: "MenuItem",
    props: ["isShowMenu","item"], 
    mixins: [CheckLoginMixins, IndexMixins],
    data: () => ({
      Menu,
      data: '',
    }),
    methods: {
      getMenuActiveClass(data){
        var showActiveClass= false
        var find= function (sitemap, current) {
          for (let i = 0; i < sitemap.length; i++) {
              let site = sitemap[i]
              if (site.name === current) {
                return true
              }else if(site.children){
                let result = find(site.children, current)
                if(result) {
                return true
                }
              }
          }
        }
        if(data.children){
          showActiveClass = find(data.children,this.$route.name)
        }else{
          showActiveClass =(data.name==this.$route.name)
        }
        return showActiveClass
      },
      handleHasMenu(data){
        var result=[]
        var find= function (sitemap) {
            for (let i = 0; i < sitemap.length; i++) {
              let site = sitemap[i]
              if (site.hasMenu) {
                result.push(Menu[site.hasMenu])
              } 
              if(site.children){
                find(site.children)
              }
          }
        }.bind(this)
          if (data.hasMenu) {
            result.push(Menu[data.hasMenu])
          } 
          if(data.children){
            find(data.children)
          }
        return this.hasMenu(...result)
      },
      hasMenu(...codes)
      {
        return _.some(codes, code =>
        {
          const menu = _.find(this.menus, {code})
          return menu && _.some(menu.nodes, x => _.endsWith(x.code, '_READ'))
        })
      },
    },
    mounted()
    {
    },
  }
</script>>