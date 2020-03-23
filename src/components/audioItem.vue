<template>
  <div class="photo-item">
    <div class="audio-player-box">
      <div class="pcast-player">
        <div class="pcast-player-controls">
          <button class="pcast-play" style="margin-right:5px" @click="startPlayOrPause"><i class="fa fa-play"></i></button>
          <!-- <button class="pcast-pause"><i class="fa fa-pause"></i><span>Pause</span></button> -->
          <button class="pcast-rewind"><i class="fa fa-fast-backward"></i><span>Rewind</span></button>
          <span class="pcast-currenttime pcast-time">00:00</span>
          <progress class="pcast-progress" value="0"></progress>
          <span class="pcast-duration pcast-time">00:00</span>
          <button class="pcast-speed">1x</button>
          <button class="pcast-mute"><i class="fa fa-volume-up"></i><span>Mute/Unmute</span></button>
        </div>
        <audio
          id="audio-1"
          ref="audio"
          autoplay="autoplay"
          :src="item.file_url"
          @pause="onPause"
          @play="onPlay"
          @timeupdate="onTimeupdate"
          @loadedmetadata="onLoadedmetadata"
        ></audio>
      </div>
    </div>
    <div class="txt" style="position: relative;">
      <h5>{{ item.original_file_name }}</h5>
      <span class="" data-toggle="tooltip" data-trigger="hover" data-container="body" data-title="删除">
        <a class="text-danger delete-dialog" id="">
          <i class="fas fa-trash-alt"></i>
        </a>
      </span>
    </div>
  </div>
</template>
<script>
function realFormatSecond(second) {
  var secondType = typeof second
  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)
    var mimute = Math.floor(second / 60)
    second = second - mimute * 60
    return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '00:00'
  }
}
export default {
  props: {
    item: { type: Object, default: '' },
  },
  computed: {},
  data() {
    return {
      song: {},
      audio: {
        // 該欄位是音訊是否處於播放狀態的屬性
        playing: false,
        currentTime: 0,
        maxTime: 0,
        minTime: 0,
        step: 0.1,
      },
      sliderTime: 0,
    }
  },
  methods: {
    startPlayOrPause() {
      return this.audio.playing ? this.pause() : this.play()
    },
    play() {
      this.$refs.audio.play()
    },
    pause() {
      this.$refs.audio.pause()
    },
    // 當音訊播放
    onPlay() {
      this.audio.playing = true
    },
    // 當音訊暫停
    onPause() {
      this.audio.playing = false
    },
    /* 音訊的時間顯示主要有兩部分，音訊的總時長和當前播放時間。可以從兩個事件中獲取

                loadedmetadata:代表音訊的元資料已經被載入完成，可以從中獲取音訊總時長
                timeupdate: 當前播放位置作為正常播放的一部分而改變，或者以特別有趣的方式，例如不連續地改變，可以從該事件中獲取音訊的當前播放時間，該事件在播放過程中會不斷被觸發 */

    // 當timeupdate事件大概每秒一次，用來更新音訊流的當前播放時間
    onTimeupdate(res) {
      this.audio.currentTime = res.target.currentTime
      this.sliderTime = parseInt((this.audio.currentTime / this.audio.maxTime) * 100)
    },
    // 當載入語音流元資料完成後，會觸發該事件的回撥函式
    // 語音元資料主要是語音的長度之類的資料
    onLoadedmetadata(res) {
      this.audio.maxTime = parseInt(res.target.duration)
    },
    // 拖動進度條，改變當前時間，index是進度條改變時的回撥函式的引數0-100之間，需要換算成實際時間
    changeCurrentTime() {
      this.$refs.audio.currentTime = parseInt((this.sliderTime / 100) * this.audio.maxTime)
    },
    // 進度條格式化toolTip
    /* formatProcessToolTip(index = 0) {
					index = parseInt(this.audio.maxTime / 100 * index)
					return '進度條: ' + realFormatSecond(index)
				}, */

    handleTouchStart(e) {
      this.setValue(e.touches[0])

      document.addEventListener('touchmove', this.handleTouchMove)
      document.addEventListener('touchup', this.handleTouchEnd)
      document.addEventListener('touchend', this.handleTouchEnd)
      document.addEventListener('touchcancel', this.handleTouchEnd)

      // e.preventDefault();
      // this.onDragStart(e);
    },
    handleTouchMove(e) {
      // console.log(e.changedTouches[0])
      this.setValue(e.changedTouches[0])
    },
    handleTouchEnd(e) {
      this.setValue(e.changedTouches[0])
      document.removeEventListener('touchmove', this.handleTouchMove)
      document.removeEventListener('touchup', this.handleTouchEnd)
      document.removeEventListener('touchend', this.handleTouchEnd)
      document.removeEventListener('touchcancel', this.handleTouchEnd)
      // this.onDragStop(e);
    },
    // 從點選位置更新 value
    setValue(e) {
      const $el = this.$el
      const { maxTime, minTime, step } = this.audio
      let value = ((e.clientX - $el.getBoundingClientRect().left) / $el.offsetWidth) * (maxTime - minTime)
      value = Math.round(value / step) * step + minTime
      value = parseFloat(value.toFixed(5))

      if (value > maxTime) {
        value = maxTime
      } else if (value < minTime) {
        value = minTime
      }
      this.$refs.audio.currentTime = value
    },

    preMusic() {
      this.audio.playing = false
      var songIndex = this.chineseSongs.findIndex(x => x.id == this.song.id)
      var preIndex = 0
      if (songIndex !== -1) {
        preIndex = songIndex - 1 < 0 ? this.chineseSongs.length - 1 : songIndex - 1
        this.song = this.chineseSongs[preIndex]
      } else {
        songIndex = this.englishSongs.findIndex(x => x.id == this.song.id)
        preIndex = songIndex - 1 < 0 ? this.englishSongs.length - 1 : songIndex - 1
        this.song = this.englishSongs[preIndex]
      }
      // this.readLyric();
    },
    nextMusic() {
      this.audio.playing = false
      var songIndex = this.chineseSongs.findIndex(x => x.id == this.song.id)
      var nextIndex = 0
      if (songIndex !== -1) {
        nextIndex = songIndex + 1 >= this.chineseSongs.length ? 0 : songIndex + 1
        this.song = this.chineseSongs[nextIndex]
      } else {
        songIndex = this.englishSongs.findIndex(x => x.id == this.song.id)
        nextIndex = songIndex + 1 >= this.englishSongs.length ? 0 : songIndex + 1
        this.song = this.englishSongs[nextIndex]
      }
      // this.readLyric();
    },
  },
  created() {
    // debugger
  },
  async destroyed() {
    // this.$emit('doDelList')
  },
}
</script>
