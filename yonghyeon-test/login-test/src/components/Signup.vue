<template>
  <form>
    <input type="text"
           placeholder="이름을 입력해주세요."
           id= "name"
           v-model= "name"
    >

    <input type="email" 
           placeholder="이메일을 입력해주세요." 
           id= "email"
           v-model= "email">

    <input type="password" 
           placeholder="비밀번호를 입력해주세요." 
           id= "pwd"
           v-model= "password">

    <input type="password" 
           placeholder="비밀번호를 다시 입력해주세요." 
           id= "check-pwd"
           v-model= "rePassword"
           ref= "pwdTest">

    <button name="submit" 
            type="button"
            @click="onSubmitSignup"
    >
      회원가입
    </button>
  </form>
</template>

<script>
import axios from 'axios'
import { VALIDATE_RESULT, errorHandler } from '../common'

export default {
  name: 'sign-up',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      rePassword: ''
    }
  },
  methods: {
    onSubmitSignup () {
      switch(this.validateSignupForm(this.name, this.email, this.password, this.rePassword)) {
        case VALIDATE_RESULT.EMPTY_NAME:
          alert('이름을 입력해주세요.');
          break;
        case VALIDATE_RESULT.INVALIDATION_EMAIL:
          alert('이메일을 확인해주세요.');
          break;
        case VALIDATE_RESULT.EMPTY_PASSWORD:
          alert('비밀번호를 입력해주세요.');
          break;
        case VALIDATE_RESULT.DIFFERENT_PASSWORD:
          alert('비밀번호를 확인해주세요.');
          break;
        case VALIDATE_RESULT.SUCCESS:
          // 여기 URL 부분 변경하셈.
          axios.post('http://192.168.43.122:8080/user', {
            name: this.name,
            email: this.email,
            password: this.password      
          })
          .then((response) => {
            console.log(response);
            this.$router.push('/check');
          })
          .catch(errorHandler);
          break;
        default:
          alert("Unknown Error!");
          break;
      }
    },

    validateSignupForm (name, email, password, rePassword) {
      const EMAIL_REGEXP = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      
      if (!EMAIL_REGEXP.test(email)) {
        return VALIDATE_RESULT.INVALIDATION_EMAIL
      }else if (password === '' || rePassword === '') {
        return VALIDATE_RESULT.EMPTY_PASSWORD
      }else if (password !== rePassword) {
        return VALIDATE_RESULT.DIFFERENT_PASSWORD
      }else if (name === '') {
        return VALIDATE_RESULT.EMPTY_NAME
      }

      return VALIDATE_RESULT.SUCCESS
    }
  },
  computed: {
    compoundProperty () {
      return [this.password, this.rePassword];
    }
  },
  watch: {
    email (val) {
      console.log('Email Value: ' + val);
    },

    compoundProperty (val) {
      let pwdTest = this.$refs['pwdTest'];
      let [pwd, rePwd] = val;

      console.log(pwd, rePwd);

      if(rePwd !== '') {
        const styleArr = ['1px solid green', '1px solid red'];
        pwdTest.style.border = (pwd === rePwd) ? styleArr[0] : styleArr[1];
      }
    }
  }
}
</script>

<style scoped>
  form {
    width: 400px;
    height: 500px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 4px darkgray;
  }

  input {
    width: 300px;
    height: 40px;
    display: block;
    margin: 0 auto;
    font-size: 14px;
    padding-left: 0.5rem;
    margin-top: 1rem;
  }

  input[type=text] {
    margin-top: 10rem;
  }

  input[type=password] {
    font-family: sans-serif;
  }

  button {
    display: block;
    width: 60%;
    height: 50px;
    background-color: #F4586D;
    border: 0;
    color: white;
    border-radius: 4px;
    font-size: 17px;
    margin: 0 auto;
    margin-top: 2rem;
    cursor: pointer;
  }
</style>
