<template>
  <div class="update-photo">
    <img :src="img" alt class="img" ref="image" />
    <div class="toolbar">
      <div @click="$emit('close')" class="cancel">取消</div>
      <div @click="onConfirm" class="confrim">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserAvatar } from '@/api/user.js'
export default {
  name: '',
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 0,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      try {
        this.cropper.getCroppedCanvas().toBlob(async blob => {
          const formData = new FormData()
          formData.append('photo', blob)
          const { data } = await updateUserAvatar(formData)
          console.log(data)
          this.$emit('close')
          this.$emit('update-avatar', data.data.photo)
          this.$toast('更新成功')
        })
      } catch (error) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confrim {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }

  .img {
    max-width: 100%;
    display: block;
  }
}
</style>
