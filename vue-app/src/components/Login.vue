<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-5">Login</h1>
        <hr>
        <form-tag @submitEvent="submitHandler" name="loginForm" event="submitEvent">
          <text-input
              v-model="email"
              label="Email"
              type="email"
              name="email"
              required="true">
          </text-input>

          <text-input
              v-model="password"
              label="Password"
              type="password"
              name="password"
              required="true">
          </text-input>
          <hr>
          <input type="submit" class="btn btn-primary" value="login">
        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
import FormTag from "@/components/forms/FormTag";
import TextInput from "@/components/forms/TextInput";
import { store } from "@/components/store"
import router from "@/router";
import notie from 'notie';

export default {
  name: "Login",
  components: {
    TextInput,
    FormTag,
  },
  data() {
    return {
      email: "",
      password: "",
      store,
    }
  },
  methods:{
    submitHandler() {
      const payload = {
        email: this.email,
        password: this.password,
      }

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(payload)
      }

      fetch(process.env.VUE_APP_API_URL + "/users/login", requestOptions)
          .then((response) => response.json())
          .then((response) => {
            if (response.error) {
              console.log("Error:", response.message)
              notie.alert({
                type: 'error',
                text: response.message
              })
            } else {
              // something else
              console.log("Token:", response.data.token.token)
              store.token = response.data.token.token;
              store.user = {
                id: response.data.user.id,
                first_name: response.data.user.first_name,
                last_name: response.data.user.last_name,
                email: response.data.user.email,
              }

              //save info to cookie
              let date = new Date();
              let expDays = 1;
              date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000))
              const expires = "expires=" + date.toUTCString()

              // set the cookie
              document.cookie = "_site_data="
              + JSON.stringify(response.data)
              + "; "
              + expires
                  // todo: "; secure" after strict
              + "; path=/; SameSite=strict"

              router.push({name: 'Home'})
            }
          })
    }
  },

}
</script>

<style scoped>

</style>