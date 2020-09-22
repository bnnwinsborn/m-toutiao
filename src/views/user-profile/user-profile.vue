<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.back()" class="page-nav-bar" left-arrow title="个人信息"></van-nav-bar>
    <input @change="onFileChange" hidden ref="file" type="file" />
    <!-- 个人信息 -->
    <van-cell title="头像">
      <van-image :src="user.photo" @click="$refs.file.click()" class="avatar" fit="cover" round />
    </van-cell>
    <van-cell :value="user.name" @click="isNameshow = true" is-link title="昵称" />
    <van-cell :value="user.gender === 0 ?'男':'女'" @click="isGendershow = true" is-link title="性别" />
    <van-cell :value="user.birthday" @click="isBirthdayshow = true" is-link title="生日" />
    <van-popup position="bottom" style="height: 100%;" v-model="isNameshow">
      <UpdateName @close="isNameshow = false" v-if="isNameshow" v-model="user.name" />
    </van-popup>
    <van-popup position="bottom" v-model="isGendershow">
      <UpdateGender @close="isGendershow = false" v-model="user.gender" />
    </van-popup>
    <van-popup position="bottom" v-model="isBirthdayshow">
      <UpdateBirthday
        @close="isBirthdayshow = false"
        v-if="isBirthdayshow"
        v-model="user.birthday"
      />
    </van-popup>
    <van-popup position="bottom" style="height:100%;" v-model="isAvatarshow">
      <UpdateAvatar
        :img="img"
        @close="isAvatarshow = false"
        @update-avatar="user.photo = $event"
        v-if="isAvatarshow"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdateName from '@/views/user-profile/components/update-name.vue'
import UpdateGender from '@/views/user-profile/components/update-gender.vue'
import UpdateBirthday from '@/views/user-profile/components/update-birthday.vue'
import UpdateAvatar from '@/views/user-profile/components/update-avatar.vue'
export default {
  data () {
    return {
      user: {},
      isNameshow: false,
      isGendershow: false,
      isBirthdayshow: false,
      isAvatarshow: false,
      img: null
    }
  },
  components: { UpdateName, UpdateGender, UpdateAvatar, UpdateBirthday },
  created () {
    this.loadUserfile()
  },

  methods: {
    async loadUserfile () {
      try {
        const { data } = await getUserProfile()
        // console.log(data)
        this.user = data.data
      } catch (error) {
        this.$toast('失败')
      }
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isAvatarshow = true
      // 选择同一文件不会触发事件，就需要清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang='less'>
.user-profile {
  /deep/ .van-icon-arrow-left {
    color: #fff;
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
