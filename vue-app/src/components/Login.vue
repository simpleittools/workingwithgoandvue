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

      fetch("http://localhost:8081/users/login", requestOptions)
          .then((response) => response.json())
          .then((response) => {
            if (response.error) {
              // something went wrong
              console.log("Error:", response.message)
            } else {
              // something else
              console.log("Token:", response.data.token.token)
              store.token = response.data.token.token
            }
          })
    }
  },

}
</script>

<style scoped>

</style>