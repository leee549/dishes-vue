<template>
  <div class="login_container">
    <vue-particles
      style="width: 1366px"
      color="#47CD88"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#47CD88"
      :linesWidth="3"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="4"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/canteen.png">
      </div>
      <!--表单-->
      <el-form label-width="0px" ref="loginFormRef" :rules="loginFormRules" :model="loginForm" class="login_form">
        <el-form-item prop="userAccount">
          <el-input prefix-icon="iconfont icon-bussiness-man" v-model="loginForm.userAccount"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item prop="userPass">
          <el-input prefix-icon="iconfont icon-unlock" v-model="loginForm.userPass" type="password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item prop="verCode">
          <el-input prefix-icon="el-icon-picture-outline-round" style="width: 50%" v-model="loginForm.verCode"
                    placeholder="请输入验证码" clearable maxlength="4"></el-input>
          <img id="verImg" :src="verImg" @click="getVerImg">
        </el-form-item>

        <!--按钮-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>


      </el-form>
    </div>
  </div>

</template>

<script>

  import {get, post} from "../main";

  export default {
    data() {
      return {
        loginForm: {
          userAccount: 'admin',
          userPass: '1',
          verCode: '',
          verKey:'',
        },
        loginFormRules: {
          userAccount: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          userPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
          ],
          verCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        },
        verImg: '',
      }

    },
    methods: {
      //重置
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields();
      },
      //发起登录请求
      login() {
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) return;
          const res = await post('auth/login', this.loginForm)
          console.log(res)
          if (res.status !== 200) {
            this.$message.error(res.msg);
            this.getVerImg();
            return;
          }
          this.$message.success("登录成功");
          window.localStorage.setItem("token", res.data.token);
          await this.$router.push('/home');
          //console.log(res)

        })
      },
      //获取验证码
      async getVerImg() {
        const {data: res} = await this.$http.get('captcha')
        this.verImg = res.data.image
        this.loginForm.verKey = res.data.key
        console.log(res.data)
      }


    },
    created() {
      this.getVerImg();

    }


  }
</script>


<style lang="less" scoped>
  .login_container {
    background-color: #f5f5f5;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 400px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

  }


  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  #verImg {
    height: 40px;
    width: 120px;
    float: right;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
  }

  #particles-js {
    width: 100% !important;
    height: 100%;
  }


</style>
