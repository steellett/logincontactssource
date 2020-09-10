<template>
  <div class="form-wrapper">
    <v-form class="login-form justify-center rounded" @submit="login">
      <div class="buttons">
        <v-btn
          class="login-button blue darken-2 white--text"
          @click="loginForm = true"
          >Вход</v-btn
        >
        <v-btn
          class="register-button blue darken-2 white--text"
          @click="loginForm = false"
          >Регистрация</v-btn
        >
      </div>
      <div class="login" v-if="loginForm">
        <v-text-field
          label="Ваш email"
          v-model="userLoginEmail"
          type="email"
          :rules="[
            () => !loginEmailError || 'Такого пользователя не существует',
          ]"
          @click="loginEmailError = false"
          autocomplete
        ></v-text-field>
        <v-text-field
          :rules="[() => !loginPasswordError || 'Пароль не совпадает']"
          @click="loginPasswordError = false"
          label="Ваш пароль"
          v-model="userLoginPassword"
          :append-icon="passwordProps.show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="passwordProps.show1 = !passwordProps.show1"
          :type="password1Type"
          autocomplete
        ></v-text-field>
      </div>
      <div class="registration" v-if="!loginForm">
        <v-text-field
          label="Ваш email"
          v-model="userRegisterEmail"
          type="email"
          :rules="[
            () =>
              $v.userRegisterEmail.email || 'Введите корректный адрес почты',
          ]"
          validate-on-blur
          autocomplete
        ></v-text-field>
        <v-text-field
          label="Ваш пароль"
          v-model="userRegisterPassword"
          :append-icon="passwordProps.show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="passwordProps.show2 = !passwordProps.show2"
          :type="password2Type"
          :rules="[
            () =>
              $v.userRegisterPassword.minLength ||
              'Пароль должен быть длиннее 6 символов',
          ]"
          validate-on-blur
          autocomplete
        ></v-text-field>
        <v-text-field
          label="Повторите пароль"
          v-model="userRepeatedPassword"
          :type="password3Type"
          :append-icon="passwordProps.show3 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="passwordProps.show3 = !passwordProps.show3"
          :rules="[
            () =>
              !!$v.userRepeatedPassword.sameAsPassword ||
              'Пароли должны совпадать',
          ]"
          validate-on-blur
          autocomplete
        ></v-text-field>
      </div>
      <v-btn class="submit-button" @click="login">Войти</v-btn>

      <div class="register-variants" v-show="!loginForm">
        <p>Или войти с помощью</p>
        <img src="../assets/google.png" alt />
        <img src="../assets/github.png" alt />
      </div>
    </v-form>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      passwordProps: {
        show1: true,
        show2: true,
        show3: true,
      },
      loginEmailError: false,
      loginPasswordError: false,
      loginForm: true,
      userLoginEmail: null,
      userLoginPassword: null,
      userRegisterEmail: null,
      userRegisterPassword: null,
      userRepeatedPassword: null,
    };
  },
  computed: {
    password1Type() {
      if (this.passwordProps.show1) {
        return "password";
      }
      return "text";
    },
    password2Type() {
      if (this.passwordProps.show2) {
        return "password";
      }
      return "text";
    },
    password3Type() {
      if (this.passwordProps.show3) {
        return "password";
      }
      return "text";
    },
  },
  methods: {
    async login() {
      if (this.loginForm) {
        const formData = {
          email: this.userLoginEmail,
          password: this.userLoginPassword,
        };
        try {
          await this.$store.dispatch("login", formData);
          await this.$store.dispatch("GET_USER_DATA", {
            email: this.userLoginEmail,
          });
          console.log(await this.$store.state.userData);
          this.$router.push("/contacts");
        } catch (e) {
          if (e.message.includes("email")) {
            this.loginEmailError = true;
            this.userLoginEmail = null;
          } else if (e.message.includes("password")) {
            this.loginPasswordError = true;
            this.userLoginPassword = null;
          }
        }
      } else {
        this.registration();
      }
    },

    async registration() {
      const formData = {
        email: this.userRegisterEmail,
        password: this.userRegisterPassword,
      };
      try {
        await this.$store.dispatch("registration", formData);
        await this.$store.dispatch("login", formData);
        this.$router.push("/contacts");
      } catch (e) {
        console.log(e);
      }
    },
  },
  validations: {
    userRegisterEmail: {
      email,
      required,
    },
    userRegisterPassword: {
      required,
      minLength: minLength(6),
    },
    userRepeatedPassword: {
      sameAsPassword: sameAs("userRegisterPassword"),
    },
  },
};
</script>

<style lang="scss">
.form-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.login-form {
  width: 30%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 3em 2em !important;
  text-align: center;
  background: rgba(255, 255, 255, 0.829);
}
.buttons {
  margin-bottom: 1em;
}
.register-button,
.login-button {
  width: 40%;
  border: none !important;
  border-radius: 0 !important ;
}
.v-input {
  i {
    cursor: pointer;
  }
}
.login-registration {
  width: 100%;
  display: flex;
  justify-content: space-between;
  p {
    display: flex;
    margin: auto 1em 0 1em;
    font-size: 0.7em;
    a {
      margin-left: 1em;
    }
  }
  .submit-button {
    width: 80%;
  }
}
.register-variants {
  margin: 1em;
  img {
    width: 20%;
    margin: 0 1em;
    cursor: pointer;
  }
}
</style>
