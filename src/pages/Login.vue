<template>
  <div id="page-container" class="fade">
    <!--begin login-->
    <div class="login bg-black animated fadeInDown">
      <!-- begin brand -->
      <div class="login-header">
        <div class="brand">
          <span class="logo"></span> <b>抖影管理系统</b>
          <small>Doing System</small>
        </div>
        <div class="icon">
          <i class="fa fa-lock"></i>
        </div>
      </div>
      <!-- end brand -->
      <!-- begin login-content -->
      <div class="login-content">
        <form class="margin-bottom-0">
          <validation v-slot="{valid}">
            <div class="form-group m-b-20">
              <validate rules="required">
                <input type="text"
                       class="form-control form-control-lg inverse-mode"
                       placeholder="帐号"
                       v-model="user.username" />
              </validate>
            </div>
            <div class="form-group m-b-20">
              <validate rules="required">
                <input type="password"
                       class="form-control form-control-lg inverse-mode"
                       placeholder="密码"
                       @keyup.13="doLogin()"
                       v-model="user.password" />
              </validate>
            </div>
            <div class="login-buttons">
              <button type="button" class="btn btn-primary btn-block btn-lg" :disabled="!valid" @click="doLogin()">
                登入
              </button>
            </div>
          </validation>
        </form>
        <alert />
      </div>
      <!-- end login-content -->
    </div>
    <!--end login-->
  </div>
</template>

<script>
  import API from 'lib/API'
  import { LoginType } from 'module/login'

  export default {
    data: () => ({
      user: {
        username: '',
        password: '',
      },
    }),
    methods: {
      async doLogin()
      {
        const passport = await API.getPassport()
        var res = await this.$api.user.passport.doLogin(Object.assign({
          grant_type: 'password',
        }, passport, this.user), {
          f: () =>
          {
            this.$alert.danger('登入失败')
          },
        })

        this.$store.commit(LoginType.setAccessToken, res.data)
        this.$router.push({
          name: 'welcome',
        })
      },
    },
    mounted()
    {
      this.$nextTick(() =>
      {
        App.init()
      })
    },
  }
</script>