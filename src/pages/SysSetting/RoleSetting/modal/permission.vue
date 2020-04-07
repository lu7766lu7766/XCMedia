<template>
  <detail title="权限" @submit="doSubmit()">
    <ul class="limit-main">
      <!-- 系统设置' -->
      <li v-if="inAllNodes(Menu.ROLE_MG, Menu.ACCOUNT_MG)">
        <permission-node
          v-model="data.nodes"
          title="系统设置"
          class-name="fas fa-cog text-black"
          :values="getAllSubNodeID([
            findNode(Menu.ROLE_MG),
            findNode(Menu.ACCOUNT_MG),
            findNode(Menu.SITE_MG)
          ])"
        />

        <ul class="limit-sub">
          <permission-tree v-model="data.nodes" :node="findNode(Menu.ROLE_MG)" />
          <permission-tree v-model="data.nodes" :node="findNode(Menu.ACCOUNT_MG)" />
          <permission-tree v-model="data.nodes" :node="findNode(Menu.SITE_MG)" />
        </ul>
        <!-- limit-sub end -->
      </li>
      <!-- 网站管理' -->
      <li v-if="inAllNodes(Menu.ANNOUNCE_MG, Menu.AD_SLIDER, Menu.QA, Menu.PAGE_MG)">
        <permission-node
          v-model="data.nodes"
          title="网站管理"
          class-name="fas fa-globe text-black"
          :values="getAllSubNodeID([
            findNode(Menu.ANNOUNCE_MG),
            findNode(Menu.AD_SLIDER),
            findNode(Menu.QA),
            findNode(Menu.PAGE_MG),
          ])"
        />

        <ul class="limit-sub">
          <permission-tree v-model="data.nodes" :node="findNode(Menu.ANNOUNCE_MG)" />
          <permission-tree v-model="data.nodes" :node="findNode(Menu.AD_SLIDER)" />
          <permission-tree v-model="data.nodes" :node="findNode(Menu.QA)" />
          <permission-tree v-model="data.nodes" :node="findNode(Menu.PAGE_MG)" />
        </ul>
        <!-- limit-sub end -->
      </li>
      <!-- 会员管理 -->
      <permission-tree
        v-model="data.nodes"
        class-name="fas fa-user text-black"
        :node="findNode(Menu.MEMBER_MG)"
      />

      <!-- 影音戏剧' -->
      <li v-if="inAllNodes(Menu.DRAMA_SOURCE_SET, Menu.DRAMA_AREA_SET, Menu.DRAMA_TYPE_SET, Menu.DRAMA_YEAR_SET, Menu.DRAMA_LANG_SET, Menu.DRAMA_TOPIC_TYPE, Menu.DRAMA_MG)">
        <permission-node
          v-model="data.nodes"
          title="影音戏剧"
          class-name="fas fa-television text-black"
          :values="getAllSubNodeID([
            findNode(Menu.DRAMA_SOURCE_SET),
            findNode(Menu.DRAMA_AREA_SET),
            findNode(Menu.DRAMA_TYPE_SET),
            findNode(Menu.DRAMA_YEAR_SET),
            findNode(Menu.DRAMA_LANG_SET),
            findNode(Menu.DRAMA_TOPIC_TYPE),
            findNode(Menu.DRAMA_MG),
          ])"
        />
        <ul class="limit-sub">
          <permission-node
            v-model="data.nodes"
            title="分类管理"
            :values="getAllSubNodeID([
              findNode(Menu.DRAMA_SOURCE_SET),
              findNode(Menu.DRAMA_AREA_SET),
              findNode(Menu.DRAMA_TYPE_SET),
              findNode(Menu.DRAMA_YEAR_SET),
              findNode(Menu.DRAMA_LANG_SET),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.DRAMA_SOURCE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.DRAMA_AREA_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.DRAMA_TYPE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.DRAMA_YEAR_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.DRAMA_LANG_SET)" />
          </ul>
          <permission-node
            v-model="data.nodes"
            title="专题管理"
            :values="getAllSubNodeID([
              findNode(Menu.DRAMA_TOPIC_TYPE),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.DRAMA_TOPIC_TYPE)" />
          </ul>
          <permission-tree v-model="data.nodes" :node="findNode(Menu.DRAMA_MG)" />
        </ul>
        <!-- limit-sub end -->
      </li>

      <!-- 影音电影' -->
      <li v-if="inAllNodes(Menu.MOVIE_SOURCE_SET, Menu.MOVIE_AREA_SET, Menu.MOVIE_TYPE_SET, Menu.MOVIE_YEAR_SET, Menu.MOVIE_LANG_SET, Menu.MOVIE_MG, Menu.MOVIE_TOPIC_TYPE)">
        <permission-node
          v-model="data.nodes"
          title="影音电影"
          class-name="fas fa-film text-black"
          :values="getAllSubNodeID([
            findNode(Menu.MOVIE_SOURCE_SET),
            findNode(Menu.MOVIE_AREA_SET),
            findNode(Menu.MOVIE_TYPE_SET),
            findNode(Menu.MOVIE_YEAR_SET),
            findNode(Menu.MOVIE_LANG_SET),
            findNode(Menu.MOVIE_MG),
            findNode(Menu.MOVIE_TOPIC_TYPE),
          ])"
        />
        <ul class="limit-sub">
          <permission-node
            v-model="data.nodes"
            title="分类管理"
            :values="getAllSubNodeID([
              findNode(Menu.MOVIE_SOURCE_SET),
              findNode(Menu.MOVIE_AREA_SET),
              findNode(Menu.MOVIE_TYPE_SET),
              findNode(Menu.MOVIE_YEAR_SET),
              findNode(Menu.MOVIE_LANG_SET),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.MOVIE_SOURCE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.MOVIE_AREA_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.MOVIE_TYPE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.MOVIE_TYPE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.MOVIE_LANG_SET)" />
          </ul>
          <permission-node
            v-model="data.nodes"
            title="专题管理"
            :values="getAllSubNodeID([
              findNode(Menu.MOVIE_TOPIC_TYPE),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.MOVIE_TOPIC_TYPE)" />
          </ul>
          <permission-tree v-model="data.nodes" :node="findNode(Menu.MOVIE_MG)" />
        </ul>
        <!-- limit-sub end -->
      </li>

      <!-- 影音动漫' -->
      <li v-if="inAllNodes(Menu.ANIME_SOURCE_SET, Menu.ANIME_AREA_SET, Menu.ANIME_TYPE_SET, Menu.ANIME_YEAR_SET, Menu.ANIME_LANG_SET, Menu.ANIME_MG, Menu.ANIME_TOPIC_TYPE)">
        <permission-node
          v-model="data.nodes"
          title="影音动漫"
          class-name="fas fa-play-circle text-black"
          :values="getAllSubNodeID([
            findNode(Menu.ANIME_SOURCE_SET),
            findNode(Menu.ANIME_AREA_SET),
            findNode(Menu.ANIME_TYPE_SET),
            findNode(Menu.ANIME_YEAR_SET),
            findNode(Menu.ANIME_LANG_SET),
            findNode(Menu.ANIME_MG),
            findNode(Menu.ANIME_TOPIC_TYPE),
          ])"
        />
        <ul class="limit-sub">
          <permission-node
            v-model="data.nodes"
            title="分类管理"
            :values="getAllSubNodeID([
              findNode(Menu.ANIME_SOURCE_SET),
              findNode(Menu.ANIME_AREA_SET),
              findNode(Menu.ANIME_TYPE_SET),
              findNode(Menu.ANIME_YEAR_SET),
              findNode(Menu.ANIME_LANG_SET),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ANIME_SOURCE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ANIME_AREA_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ANIME_TYPE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ANIME_YEAR_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ANIME_LANG_SET)" />
          </ul>
          <permission-node
            v-model="data.nodes"
            title="专题管理"
            :values="getAllSubNodeID([
              findNode(Menu.ANIME_TOPIC_TYPE),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ANIME_TOPIC_TYPE)" />
          </ul>
          <permission-tree v-model="data.nodes" :node="findNode(Menu.ANIME_MG)" />
        </ul>
        <!-- limit-sub end -->
      </li>

      <!-- 影音综艺' -->
      <li v-if="inAllNodes(Menu.VARIETY_SOURCE_SET, Menu.VARIETY_AREA_SET, Menu.VARIETY_TYPE_SET, Menu.VARIETY_YEAR_SET, Menu.VARIETY_LANG_SET, Menu.VARIETY_MG, Menu.VARIETY_TOPIC_TYPE)">
        <permission-node
          v-model="data.nodes"
          title="影音综艺"
          class-name="fas fa-smile-o text-black"
          :values="getAllSubNodeID([
            findNode(Menu.VARIETY_SOURCE_SET),
            findNode(Menu.VARIETY_AREA_SET),
            findNode(Menu.VARIETY_TYPE_SET),
            findNode(Menu.VARIETY_TYPE_SET),
            findNode(Menu.VARIETY_LANG_SET),
            findNode(Menu.VARIETY_MG),
            findNode(Menu.VARIETY_TOPIC_TYPE),
          ])"
        />
        <ul class="limit-sub">
          <permission-node
            v-model="data.nodes"
            title="分类管理"
            :values="getAllSubNodeID([
              findNode(Menu.VARIETY_SOURCE_SET),
              findNode(Menu.VARIETY_AREA_SET),
              findNode(Menu.VARIETY_TYPE_SET),
              findNode(Menu.VARIETY_TYPE_SET),
              findNode(Menu.VARIETY_LANG_SET),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.VARIETY_SOURCE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.VARIETY_AREA_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.VARIETY_TYPE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.VARIETY_TYPE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.VARIETY_LANG_SET)" />
          </ul>
          <permission-node
            v-model="data.nodes"
            title="专题管理"
            :values="getAllSubNodeID([
              findNode(Menu.VARIETY_TOPIC_TYPE),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.VARIETY_TOPIC_TYPE)" />
          </ul>
          <permission-tree v-model="data.nodes" :node="findNode(Menu.VARIETY_MG)" />
        </ul>
        <!-- limit-sub end -->
      </li>

      <!-- 成人长片' -->
      <li v-if="inAllNodes(Menu.AV_LONG_AREA_SET, Menu.AV_LONG_ACTRESS_SET, Menu.AV_LONG_CUP_SET, Menu.AV_LONG_TYPE_SET, Menu.AV_LONG_YEAR_SET, Menu.AV_LONG_TOPIC_TYPE)">
        <permission-node
          v-model="data.nodes"
          title="成人长片"
          class-name="fas fa-youtube-play text-black"
          :values="getAllSubNodeID([
            findNode(Menu.AV_LONG_AREA_SET),
            findNode(Menu.AV_LONG_ACTRESS_SET),
            findNode(Menu.AV_LONG_CUP_SET),
            findNode(Menu.AV_LONG_TYPE_SET),
            findNode(Menu.AV_LONG_YEAR_SET),
            findNode(Menu.AV_LONG_TOPIC_TYPE),
          ])"
        />
        <ul class="limit-sub">
          <permission-node
            v-model="data.nodes"
            title="分类管理"
            :values="getAllSubNodeID([
              findNode(Menu.AV_LONG_AREA_SET),
              findNode(Menu.AV_LONG_ACTRESS_SET),
              findNode(Menu.AV_LONG_CUP_SET),
              findNode(Menu.AV_LONG_TYPE_SET),
              findNode(Menu.AV_LONG_YEAR_SET),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_LONG_AREA_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_LONG_ACTRESS_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_LONG_CUP_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_LONG_TYPE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_LONG_YEAR_SET)" />
          </ul>
          <permission-node
            v-model="data.nodes"
            title="专题管理"
            :values="getAllSubNodeID([
              findNode(Menu.AV_LONG_TOPIC_TYPE),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_LONG_TOPIC_TYPE)" />
          </ul>
        </ul>
        <!-- limit-sub end -->
      </li>

      <!-- 成人短片' -->
      <li v-if="inAllNodes(Menu.AV_SHORT_AREA_SET, Menu.AV_SHORT_ACTRESS_SET, Menu.AV_SHORT_CUP_SET, Menu.AV_SHORT_TYPE_SET, Menu.AV_SHORT_YEAR_SET, Menu.AV_SHORT_TOPIC_TYPE)">
        <permission-node
          v-model="data.nodes"
          title="成人短片"
          class-name="fas fa-youtube-play text-black"
          :values="getAllSubNodeID([
            findNode(Menu.AV_SHORT_AREA_SET),
            findNode(Menu.AV_SHORT_ACTRESS_SET),
            findNode(Menu.AV_SHORT_CUP_SET),
            findNode(Menu.AV_SHORT_TYPE_SET),
            findNode(Menu.AV_SHORT_YEAR_SET),
            findNode(Menu.AV_SHORT_TOPIC_TYPE),
          ])"
        />
        <ul class="limit-sub">
          <permission-node
            v-model="data.nodes"
            title="分类管理"
            :values="getAllSubNodeID([
              findNode(Menu.AV_SHORT_AREA_SET),
              findNode(Menu.AV_SHORT_ACTRESS_SET),
              findNode(Menu.AV_SHORT_CUP_SET),
              findNode(Menu.AV_SHORT_TYPE_SET),
              findNode(Menu.AV_SHORT_YEAR_SET),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_SHORT_AREA_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_SHORT_ACTRESS_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_SHORT_CUP_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_SHORT_TYPE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_SHORT_YEAR_SET)" />
          </ul>
          <permission-node
            v-model="data.nodes"
            title="专题管理"
            :values="getAllSubNodeID([
              findNode(Menu.AV_SHORT_TOPIC_TYPE),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_SHORT_TOPIC_TYPE)" />
          </ul>
        </ul>
        <!-- limit-sub end -->
      </li>

      <!-- 成人自拍' -->
      <li v-if="inAllNodes(Menu.AV_SELFIE_AREA_SET, Menu.AV_SELFIE_ACTRESS_SET, Menu.AV_SELFIE_CUP_SET, Menu.AV_SELFIE_TYPE_SET, Menu.AV_SELFIE_YEAR_SET, Menu.AV_SELFIE_TOPIC_TYPE)">
        <permission-node
          v-model="data.nodes"
          title="成人自拍"
          class-name="fas fa-camera text-black"
          :values="getAllSubNodeID([
            findNode(Menu.AV_SELFIE_AREA_SET),
            findNode(Menu.AV_SELFIE_ACTRESS_SET),
            findNode(Menu.AV_SELFIE_CUP_SET),
            findNode(Menu.AV_SELFIE_TYPE_SET),
            findNode(Menu.AV_SELFIE_YEAR_SET),
            findNode(Menu.AV_SELFIE_TOPIC_TYPE),
          ])"
        />
        <ul class="limit-sub">
          <permission-node
            v-model="data.nodes"
            title="分类管理"
            :values="getAllSubNodeID([
              findNode(Menu.AV_SELFIE_AREA_SET),
              findNode(Menu.AV_SELFIE_ACTRESS_SET),
              findNode(Menu.AV_SELFIE_CUP_SET),
              findNode(Menu.AV_SELFIE_TYPE_SET),
              findNode(Menu.AV_SELFIE_YEAR_SET),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_SELFIE_AREA_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_SELFIE_ACTRESS_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_SELFIE_CUP_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_SELFIE_TYPE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_SELFIE_YEAR_SET)" />
          </ul>
          <permission-node
            v-model="data.nodes"
            title="专题管理"
            :values="getAllSubNodeID([
              findNode(Menu.AV_SELFIE_TOPIC_TYPE),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_SELFIE_TOPIC_TYPE)" />
          </ul>
        </ul>
        <!-- limit-sub end -->
      </li>

      <!-- 成人写真' -->
      <li v-if="inAllNodes(Menu.ADULT_PHOTO_AREA_SET, Menu.ADULT_PHOTO_ACTRESS_SET, Menu.ADULT_PHOTO_CUP_SET, Menu.ADULT_PHOTO_TYPE_SET, Menu.ADULT_PHOTO_YEAR_SET, Menu.ADULT_PHOTO_TOPIC_TYPE)">
        <permission-node
          v-model="data.nodes"
          title="成人写真"
          class-name="fas fa-file-image-o text-black"
          :values="getAllSubNodeID([
            findNode(Menu.ADULT_PHOTO_AREA_SET),
            findNode(Menu.ADULT_PHOTO_ACTRESS_SET),
            findNode(Menu.ADULT_PHOTO_CUP_SET),
            findNode(Menu.ADULT_PHOTO_TYPE_SET),
            findNode(Menu.ADULT_PHOTO_YEAR_SET),
            findNode(Menu.ADULT_PHOTO_TOPIC_TYPE),
          ])"
        />
        <ul class="limit-sub">
          <permission-node
            v-model="data.nodes"
            title="分类管理"
            :values="getAllSubNodeID([
              findNode(Menu.ADULT_PHOTO_AREA_SET),
              findNode(Menu.ADULT_PHOTO_ACTRESS_SET),
              findNode(Menu.ADULT_PHOTO_CUP_SET),
              findNode(Menu.ADULT_PHOTO_TYPE_SET),
              findNode(Menu.ADULT_PHOTO_YEAR_SET),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_PHOTO_AREA_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_PHOTO_ACTRESS_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_PHOTO_CUP_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_PHOTO_TYPE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_PHOTO_YEAR_SET)" />
          </ul>
          <permission-node
            v-model="data.nodes"
            title="专题管理"
            :values="getAllSubNodeID([
              findNode(Menu.ADULT_PHOTO_TOPIC_TYPE),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_PHOTO_TOPIC_TYPE)" />
          </ul>
        </ul>
        <!-- limit-sub end -->
      </li>

      <!-- 成人视频' -->
      <li v-if="inAllNodes(Menu.AV_AREA_SET, Menu.AV_ACTRESS_SET, Menu.AV_CUP_SET, Menu.AV_TYPE_SET, Menu.AV_YEAR_SET, Menu.AV_TOPIC_TYPE)">
        <permission-node
          v-model="data.nodes"
          title="成人视频"
          class-name="fas fa-video-camera text-black"
          :values="getAllSubNodeID([
            findNode(Menu.AV_AREA_SET),
            findNode(Menu.AV_ACTRESS_SET),
            findNode(Menu.AV_CUP_SET),
            findNode(Menu.AV_TYPE_SET),
            findNode(Menu.AV_YEAR_SET),
            findNode(Menu.AV_TOPIC_TYPE),
          ])"
        />
        <ul class="limit-sub">
          <permission-node
            v-model="data.nodes"
            title="分类管理"
            :values="getAllSubNodeID([
              findNode(Menu.AV_AREA_SET),
              findNode(Menu.AV_ACTRESS_SET),
              findNode(Menu.AV_CUP_SET),
              findNode(Menu.AV_TYPE_SET),
              findNode(Menu.AV_YEAR_SET),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_AREA_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_ACTRESS_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_CUP_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_TYPE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_YEAR_SET)" />
          </ul>
          <permission-node
            v-model="data.nodes"
            title="专题管理"
            :values="getAllSubNodeID([
              findNode(Menu.AV_TOPIC_TYPE),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.AV_TOPIC_TYPE)" />
          </ul>
        </ul>
        <!-- limit-sub end -->
      </li>

      <!-- 成人漫画' -->
      <li v-if="inAllNodes(Menu.ADULT_COMIC_AREA_SET, Menu.ADULT_COMIC_TYPE_SET, Menu.ADULT_COMIC_YEAR_SET, Menu.ADULT_COMIC_TOPIC_TYPE)">
        <permission-node
          v-model="data.nodes"
          title="成人漫画"
          class-name="fas fa-video-camera text-black"
          :values="getAllSubNodeID([
            findNode(Menu.ADULT_COMIC_AREA_SET),
            findNode(Menu.ADULT_COMIC_TYPE_SET),
            findNode(Menu.ADULT_COMIC_YEAR_SET),
            findNode(Menu.ADULT_COMIC_TOPIC_TYPE),
          ])"
        />
        <ul class="limit-sub">
          <permission-node
            v-model="data.nodes"
            title="分类管理"
            :values="getAllSubNodeID([
              findNode(Menu.ADULT_COMIC_AREA_SET),
              findNode(Menu.ADULT_COMIC_TYPE_SET),
              findNode(Menu.ADULT_COMIC_YEAR_SET),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_COMIC_AREA_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_COMIC_TYPE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_COMIC_YEAR_SET)" />
          </ul>
          <permission-node
            v-model="data.nodes"
            title="专题管理"
            :values="getAllSubNodeID([
              findNode(Menu.ADULT_COMIC_TOPIC_TYPE),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_COMIC_TOPIC_TYPE)" />
          </ul>
        </ul>
        <!-- limit-sub end -->
      </li>

      <!-- 成人文学' -->
      <li v-if="inAllNodes(Menu.ADULT_LITERATURE_AREA_SET, Menu.ADULT_LITERATURE_TYPE_SET, Menu.ADULT_LITERATURE_YEAR_SET, Menu.ADULT_LITERATURE_TOPIC_TYPE)">
        <permission-node
          v-model="data.nodes"
          title="成人文学"
          class-name="fas fa-file text-black"
          :values="getAllSubNodeID([
            findNode(Menu.ADULT_LITERATURE_AREA_SET),
            findNode(Menu.ADULT_LITERATURE_TYPE_SET),
            findNode(Menu.ADULT_LITERATURE_YEAR_SET),
            findNode(Menu.ADULT_LITERATURE_TOPIC_TYPE),
          ])"
        />
        <ul class="limit-sub">
          <permission-node
            v-model="data.nodes"
            title="分类管理"
            :values="getAllSubNodeID([
              findNode(Menu.ADULT_LITERATURE_AREA_SET),
              findNode(Menu.ADULT_LITERATURE_TYPE_SET),
              findNode(Menu.ADULT_LITERATURE_YEAR_SET),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_LITERATURE_AREA_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_LITERATURE_TYPE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_LITERATURE_YEAR_SET)" />
          </ul>
          <permission-node
            v-model="data.nodes"
            title="专题管理"
            :values="getAllSubNodeID([
              findNode(Menu.ADULT_LITERATURE_TOPIC_TYPE),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_LITERATURE_TOPIC_TYPE)" />
          </ul>
        </ul>
        <!-- limit-sub end -->
      </li>

      <!-- 成人说书' -->
      <li v-if="inAllNodes(Menu.ADULT_STORYAREA_SET, Menu.ADULT_STORYTYPE_SET, Menu.ADULT_STORYYEAR_SET, Menu.ADULT_STORY_TOPIC_TYPE)">
        <permission-node
          v-model="data.nodes"
          title="成人说书"
          class-name="fas fa-book text-black"
          :values="getAllSubNodeID([
            findNode(Menu.ADULT_STORYAREA_SET),
            findNode(Menu.ADULT_STORYTYPE_SET),
            findNode(Menu.ADULT_STORYYEAR_SET),
            findNode(Menu.ADULT_STORY_TOPIC_TYPE),
          ])"
        />
        <ul class="limit-sub">
          <permission-node
            v-model="data.nodes"
            title="分类管理"
            :values="getAllSubNodeID([
              findNode(Menu.ADULT_STORYAREA_SET),
              findNode(Menu.ADULT_STORYTYPE_SET),
              findNode(Menu.ADULT_STORYYEAR_SET),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_STORYAREA_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_STORYTYPE_SET)" />
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_STORYYEAR_SET)" />
          </ul>
          <permission-node
            v-model="data.nodes"
            title="专题管理"
            :values="getAllSubNodeID([
              findNode(Menu.ADULT_STORY_TOPIC_TYPE),
            ])"
          />
          <ul class="limit-sub">
            <permission-tree v-model="data.nodes" :node="findNode(Menu.ADULT_STORY_TOPIC_TYPE)" />
          </ul>
        </ul>
        <!-- limit-sub end -->
      </li>

      <!-- 历程记录' -->
      <li v-if="inAllNodes(Menu.ACCOUNT_LOGIN_HISTORY)">
        <permission-node
          v-model="data.nodes"
          title="历程记录"
          class-name="fas fa-history text-black"
          :values="getAllSubNodeID([
            findNode(Menu.ACCOUNT_LOGIN_HISTORY),
          ])"
        />

        <ul class="limit-sub">
          <permission-tree v-model="data.nodes" :node="findNode(Menu.ACCOUNT_LOGIN_HISTORY)" />
        </ul>
        <!-- limit-sub end -->
      </li>
    </ul>
  </detail>
</template>

<script>
import Menu from 'constants/Menu'
import IndexMixins from 'mixins/Index'
import DetailMixins from 'mixins/Detail'
import { JacLib } from 'jactools'

export default {
  components: {
    PermissionNode: () => import('@/Permission/Node'),
    PermissionTree: () => import('@/Permission/Tree')
  },
  mixins: [IndexMixins, DetailMixins],
  data: () => ({
    thisOptions: {
      Nodes: {
        All: [],
        Own: []
      }
    },
    data: {
      id: '',
      nodes: []
    },
    Menu
  }),
  mounted () {
    this.$bus.on('permission.show', async (id) => {
      this.getAllNodes()
      await this.getOwnNodes(id)
      this.data.id = id
      setTimeout(() => {
        this.data.nodes = _.chain(this.thisOptions.Nodes.Own).map('nodes').reduce((result, node) => {
          return result.concat(_.map(node, 'id'))
        }, []).value()
      })
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('permission.show')
  },
  methods: {
    async getAllNodes () {
      const res = await this.$thisApi.getAllNodes()
      this.thisOptions.Nodes.All = res.data
    },
    async getOwnNodes (id) {
      const res = await this.$thisApi.getOwnNodes({ id })
      this.thisOptions.Nodes.Own = res.data
    },
    inAllNodes (...codes) {
      for (const code of codes) {
        if (_.some(this.thisOptions.Nodes.All, { code })) {
          return true
        }
      }
      return false
    },
    findNode (code) {
      return _.find(this.thisOptions.Nodes.All, { code })
    },
    getAllSubNodeID: JacLib.getAllSubNodeID,
    async doSubmit () {
      await this.$thisApi.doBind(this.data)
      this.getNodes()
      this.$alert.success('绑定成功')
      this.$modal.hide()
    }
  }
}
</script>
