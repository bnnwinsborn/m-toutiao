<template>
  <div class="login-container">
    <!-- 导航 -->
    <van-nav-bar class="page-nav-bar" title="您需要登录才能继续访问">
      <van-icon @click="$router.back('/my')" name="cross" slot="right" />
    </van-nav-bar>
    <!-- 密码登录表单 -->
    <van-form @submit="onPassword" submit-on-enter v-if="mimadialog">
      <van-field
        :rules="loginFromRules.username"
        name="username"
        placeholder="用户名/手机号/会员名"
        v-model="loginFrom.username"
      >
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        :rules="loginFromRules.password"
        name="password"
        placeholder="请输入密码"
        type="password"
        v-model="loginFrom.password"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
      </van-field>
      <div style="margin: 16px;">
        <van-button block native-type="submit" round type="primary">登录</van-button>
      </div>
      <a @click="Dialog" class="change" href="javascript:void(0)" v-if="loginWay">密码登录</a>
      <a @click="Dialog" class="change" href="javascript:void(0)" v-else>验证码登录</a>
    </van-form>
    <!-- 验证码登录表单 -->
    <van-form @submit="onSubmit" ref="loginFromRef" submit-on-enter v-else>
      <van-field
        :rules="userFromRlues.mobile"
        maxlength="11"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        v-model="user.mobile"
      >
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        :rules="userFromRlues.code"
        maxlength="6"
        name="code"
        placeholder="请输入验证码"
        type="number"
        v-model="user.code"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            :time="1000 * 60"
            @finish="isCountDownShow = false"
            format="ss 秒后重试"
            slot="button"
            v-if="isCountDownShow"
          />
          <!-- 发送验证码 -->
          <van-button
            @click="onSendSmsCode"
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="default"
            v-else
          >发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button block native-type="submit" round type="primary">登录</van-button>
      </div>
      <a @click="Dialog" class="change" href="javascript:void(0)" v-if="loginWay">密码登录</a>
      <a @click="Dialog" class="change" href="javascript:void(0)" v-else>验证码登录</a>
    </van-form>
    <van-divider
      :style="{ color: '#666', borderColor: '#666', padding: '0 16px',marginTop:'100px' }"
    >其他方式登录</van-divider>
    <div @click="$router.push('/other')" class="my-icon">
      <i class="iconfont iconfont-QQ"></i>
      <i class="iconfont iconfont-weixin"></i>
      <i class="iconfont iconfont-weibo"></i>
    </div>
    <!-- 协议条款 -->
    <div class="xieyi">
      <span>
        温馨提示：未注册帐号的手机号，登录时将自动注册，且代表已同意
        <a href="javascript:void(0)">《用户服务协议》</a>
      </span>
    </div>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  props: [],
  data () {
    return {
      loginWay: true,
      mimadialog: false,
      loginFrom: {
        username: 'BnnWinsborn',
        password: '036411'
      },
      user: {
        mobile: '15282922045', // 手机号17090086870，13911111111
        code: ''// 验证码，246810
      },
      loginFromRules: {
        username: [
          { required: true, message: '请填写用户名' },
          { pattern: /^[a-zA-z]\w{3,11}$/, message: '用户名字母、数字、下划线组成，字母开头，4-12位' }
        ],
        password: [
          { required: true, message: '请填写密码' },
          { pattern: /^(\w){6,20}$/, message: '密码需要6-20个字母、数字、下划线' }
        ]
      },
      userFromRlues: {
        mobile: [{
          required: true,
          message: '请输入手机号'
        }, {
          pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
          message: '手机号不合法'
        }],
        code: [{
          required: true,
          message: '请输入验证码'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  created () {

  },
  methods: {
    // 控制密码登录还是验证码登录
    Dialog () {
      this.loginWay = !this.loginWay
      this.mimadialog = !this.mimadialog
    },
    // 验证码登录
    async onSubmit () {
      // 获取表单数据
      const user = this.user
      // 表单验证
      // 提交表单
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data: res } = await login(user)
        // this.$notify({ type: 'success', message: '登录成功正在跳转' })
        this.$toast.success('登录成功', res)
        this.$store.commit('setUser', res.data)
        // 不严谨功能优化后在处理
        this.$router.back()
      } catch (error) {
        if (error && error.response && error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试', error)
        }
      }
      // 后续操作
    },
    // 账号密码登录
    onPassword () {
      console.log(11)
      if (this.loginFrom.username === 'BnnWinsborn' && this.loginFrom.password === '036411') {
        this.$toast.loading({
          message: '登录中...',
          forbidClick: true,
          duration: 0
        })
        this.$toast.success('登录成功')
        this.onSubmit()
        this.$router.back()
      } else {
        this.$toast.fail('账号或者密码错误')
      }
    },
    // 发送验证码
    async onSendSmsCode () {
      // await this.$refs.loginFromRef.validate('mabile')
      this.isCountDownShow = true
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功,请注意查收')
      } catch (error) {
        this.isCountDownShow = false
        if (error && error.response && error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }

}
</script>

<style lang="less" scoped>
.login-container {
  .van-cell,
  .van-icon {
    color: #fff;
    // background: transparent;
  }

  .toutiao {
    font-size: 37px;
    color: #323232;
  }
  .my-icon {
    display: flex;
    align-items: cneter;
    justify-content: center;
  }
  .iconfont {
    font-size: 55px;
    margin: 7px;
  }
  .iconfont-QQ {
    color: #5b9ec6;
  }
  .iconfont-weixin {
    color: #4cbf00;
  }
  .iconfont-weibo {
    color: #d81e06;
  }
  .send-sms-btn {
    // width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #07c160;
    font-size: 22px;
    color: #fff;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
  .xieyi {
    margin: 50px 30px 0 30px;
    display: flex;
    align-items: cneter;
    justify-content: center;
    font-size: 26px;
    a {
      color: #5373d4;
    }
  }
  .change {
    margin-left: 30px;
    font-size: 36px;
    color: #5373d4;
  }
}
</style>
