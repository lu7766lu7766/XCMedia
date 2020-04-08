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
        <a href="javascript:;">成人文学</a>
      </li>
      <li class="breadcrumb-item">
        <a href="javascript:;">专题管理</a>
      </li>
      <li class="breadcrumb-item active">
        专题分类
      </li>
    </ol>

    <!-- begin row -->
    <div class="">
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">
            专题分类
          </h4>
        </div>
        <!-- end panel-heading -->
        <!-- begin panel-body -->
        <div class="panel-body">
          <alert />
          <div class="row m-b-20 justify-content-end panel-search-box">
            <div class="col-sm-2">
              <j-button type="add" class="add-btn" @click="$bus.emit('create.show')" />
            </div>
            <div class="col-sm-10 form-inline justify-content-end panel-search">
              <div class="form-group width-100 m-r-10">
                <j-select v-model="search.status" title="状态" :datas="options.status" />
              </div>
              <div class="form-group m-r-10">
                <input v-model="search.title" type="text" class="form-control" placeholder="请输入名称">
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
                  <th class="width-200">
                    图片
                  </th>
                  <th>名称</th>
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
                  <td class="td-img slider-img-td">
                    <img :src="toResourceUrl(data.image_path)" @click="$bus.emit('image.show', toResourceUrl(data.image_path))">
                  </td>
                  <td>{{ data.title }}</td>
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
    <image-container />
    <create />
    <update />
  </div>
</template>

<script>
import Enable from 'constants/Enable'
import ListMixins from 'mixins/List'
import ImageMixins from 'mixins/Image'

export default {
  components: {
    ImageContainer: require('@/Container/Image').default,
    Create: require('./modal/create').default,
    Update: require('./modal/update').default
  },
  mixins: [ListMixins, ImageMixins],
  data: () => ({
    search: {
      status: '',
      title: ''
    },
    options: {
      status: Enable
    }
  }),
  api: 'adult_literature.topic_ype',
  created () {
    this.doSearch()
  }
}
</script>
