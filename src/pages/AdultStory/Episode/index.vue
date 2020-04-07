<template>
  <div id="content" class="content">
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right m-b-20">
      <li class="breadcrumb-item">
        <router-link :to="{ name: 'welcome' }">
          首页
        </router-link>
      </li>
      <li class="breadcrumb-item">
        <a href="javascript:;">成人漫画</a>
      </li>
      <li class="breadcrumb-item active">
        漫画管理
      </li>
    </ol>
    <!-- begin row -->
    <div class="">
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">
            语音管理-{{ $route.query.name }}
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
              <router-link class="btn btn-white" :to="{ name: 'adult-story-manage' }">
                <i class="fas fa-angle-left" />
                返回
              </router-link>
            </div>
          </div>
          <!-- begin table-responsive -->
          <div class="dropzone-box page-dropzone-box">
            <div class="photo-list">
              <audioItem v-for="(data, index) in datas" :key="index" :item="data" @onDelete="onDelete" />
            </div>
          </div>
          <!-- begin table-responsive -->
          <!-- pagination -->
          <paginate :page="paginate.page" :last-page="lastPage" @pageChange="pageChange" />
          <!-- end pagination -->
        </div>
      </div>
    </div>
    <image-container />
    <create @doSearch="doSearch" />
    <!-- <update /> -->
  </div>
</template>

<script>
import Enable from 'constants/Enable'
import ListMixins from 'mixins/List'

export default {
  components: {
    ImageContainer: require('@/Container/Image').default,
    Create: require('./modal/create').default,
    audioItem: require('@/audioItem.vue').default
  },
  mixins: [ListMixins],
  data: () => ({
    search: {
      storytelling_id: ''
    },
    options: {
      status: Enable,
      source: []
    }
  }),
  api: 'adult_story.episode',
  created () {
    this.search.storytelling_id = this.$route.params.id
    this.doSearch()
  },
  methods: {
    async onDelete (id) {
      await this.doDeleteConfirm()
      const data = { audio_id: id, storytelling_id: this.$route.params.id }
      await this.$thisApi.doDelete(data)
      this.deleteSuccess()
    }
  }
}
</script>
