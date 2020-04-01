<template>
  <div id="content" class="content">
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right m-b-20">
      <li class="breadcrumb-item">
        <router-link :to="{ name: 'welcome' }">首页</router-link>
      </li>
      <li class="breadcrumb-item"><a href="javascript:;">成人写真</a></li>
      <li class="breadcrumb-item active">写真管理</li>
    </ol>
    <!-- begin row -->
    <div class="">
      <!-- begin panel -->
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">图片管理-{{ $route.query.name }}</h4>
        </div>
        <!-- end panel-heading -->
        <!-- begin panel-body -->
        <div class="panel-body">
          <alert />
          <div class="row m-b-20 justify-content-end panel-search-box">
            <div class="col-sm-2">
              <j-button type="add" @click="$bus.emit('create.show')"></j-button>
            </div>
            <div class="col-sm-10 form-inline justify-content-end panel-search">
              <router-link
                class="btn btn-white"
                :to="{ name: 'adult-photo-manage' }"
              >
                <i class="fas fa-angle-left"></i>
                返回
              </router-link>
            </div>
          </div>
          <!-- begin table-responsive -->
          <div class="dropzone-box page-dropzone-box">
            <div class="photo-list">
              <div v-for="(item, index) in datas" class="photo-item">
                <div
                  class="img"
                  @click="$bus.emit('image.show', toResourceUrl(item.file_path))"
                  :style="`background-image: url('${toResourceUrl(item.file_path)}');`"
                ></div>
                <div class="txt">
                  <h5>{{ item.name }}</h5>
                  <span
                    class=""
                    data-toggle="tooltip"
                    data-trigger="hover"
                    data-container="body"
                    @click="onDelete(item.id)"
                    data-title="删除"
                  >
                    <a class="text-danger delete-dialog" id="">
                      <i class="fas fa-trash-alt"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end panel-body -->
      </div>
      <!-- end panel -->
    </div>
    <image-container />
    <create />
  </div>
</template>

<script>
import ListMixins from "mixins/List";
import ImageMixins from 'mixins/Image'
import Enable from "constants/Enable";

export default {
  mixins: [ListMixins, ImageMixins],
  components: {
    ImageContainer: require("@/Container/Image").default,
    Create: require("./modal/create").default
  },
  data() {
    return {
      options: {
        status: Enable
      }
    }
  },
  api: "adult_photo.photo",
  methods: {
    async onDelete(id) {
      await this.doDeleteConfirm();
      await this.$thisApi.doDelete({ id: id });
      this.deleteSuccess();
    }
  },
  async created() {
    this.search = {photography_id: this.$route.params.id}
    await this.getList();
  }
};
</script>
