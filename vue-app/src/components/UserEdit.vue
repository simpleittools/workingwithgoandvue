<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">User Edit</h1>
        <hr>
        <FormTag @userEditEvent="submitHandler" name="userform" event="userEditEvent">
          <TextInput
            v-model="user.first_name"
            type="text"
            required="true"
            label="First Name"
            :value="user.first_name"
            name="first-name">
          </TextInput>
          <TextInput
            v-model="user.last_name"
            type="text"
            required="true"
            label="Last Name"
            :value="user.last_name"
            name="last-name">
          </TextInput>
          <TextInput
            v-model="user.email"
            type="email"
            required="true"
            label="Email"
            :value="user.email"
            name="email">
          </TextInput>
          <TextInput
            v-if="this.user.id === 0"
            v-model="user.password"
            type="password"
            required="true"
            label="Password"
            :value="user.password"
            name="password">
          </TextInput>
          <TextInput
            v-else
            v-model="user.password"
            type="password"
            required="false"
            label="Password"
            :value="user.password"
            name="password">
          </TextInput>
          <hr>
          <div class="float-start">
            <input type="submit" class="btn btn-primary me-2" value="save">
            <router-link :to="{name: 'Users'}" class="btn btn-outline-secondary">Cancel</router-link>
          </div>
          <div class="float-end">
            <span
                v-if="(this.$route.params.userId > 0
                && (parseInt(String(this.$route.params.userId),
                10) !== store.user.id))"
                class="btn btn-danger"
                @click="confirmDelete(this.user.id)"
            >Delete</span>
          </div>
          <div class="clearfix"></div>
        </FormTag>
      </div>
    </div>
  </div>
</template>

<script>
import FormTag from "@/components/forms/FormTag";
import TextInput from "@/components/forms/TextInput";
import notie from 'notie'
import Security from "@/components/security";

import {store} from "@/components/store";

export default {
  name: "UserEdit",
  components: {
    FormTag,
    TextInput
  },
  beforeMount() {
    if (parseInt(String(this.$route.params.userId), 10) > 0) {
      // editing an existing user
      // todo: get user from database
    }
  },
  data() {
    return {
      user: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
      store,
    }
  },
  methods: {
    submitHandler() {
      const payload = {
        id: parseInt(String(this.$route.params.userId),10),
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password,
      }
      fetch(`${process.env.VUE_APP_API_URL}/admin/users/save`, Security.requestOptions(payload))
          .then((response)=>response.json())
          .then((data) => {
            if (data.error) {
              notie.alert({
                type: 'error',
                text: data.message
              })
            } else {
              notie.alert({
                type: 'success',
                text: "Changes Saved!",
              })
            }
          })
          .catch((error) => {
            notie.alert({
              type: 'error',
              text: error,
            })
      })
    },
    confirmDelete(){

    }
  }

}
</script>

<style scoped>

</style>