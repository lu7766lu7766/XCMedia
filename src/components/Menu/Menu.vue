<template>
  <ul class="nav">
    <MenuItem :isShowMenu="isShowMenu" :item="item" :key="index" v-for="(item, index) in router">
    </MenuItem>
    <li>
      <a class="sidebar-minify-btn"
        @click="$bus.emit('menu.show', isShowMenu=!isShowMenu)"><i class="fa fa-angle-double-left"></i></a>
    </li> 
  </ul>
</template>

<script>
  import MenuItem from "./MenuItem";

  export default {
    name: "Menu",
    props: ["router"], 
    components: { MenuItem },
    data: () => ({
      isShowMenu: true,
    }),
  };
</script>