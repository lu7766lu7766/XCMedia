<template>
  <ul class="nav">
    <MenuItem v-for="(item, index) in router" :key="index" :is-show-menu="isShowMenu" :item="item" />
    <li>
      <a
        class="sidebar-minify-btn"
        @click="$bus.emit('menu.show', isShowMenu=!isShowMenu)"
      ><i class="fa fa-angle-double-left" /></a>
    </li>
  </ul>
</template>

<script>
import MenuItem from './MenuItem'

export default {
  name: 'Menu',
  components: { MenuItem },
  props: ['router'],
  data: () => ({
    isShowMenu: true
  })
}
</script>
