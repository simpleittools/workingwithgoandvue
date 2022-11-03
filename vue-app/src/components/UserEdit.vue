<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">User Edit</h1>
        <hr>
        <FormTag @userEditEvent="submitHandler" name="userform" event="userEditEvent" v-if="this.ready">
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
            label="Password"
            :value="user.password"
            name="password">
          </TextInput>

          <div class="form-check">
            <input type="radio" v-model="user.active" class="form-check-input" id="user-active" :value="1">
            <label for="user-active" class="form-check-label">Active</label>
          </div>
          <div class="form-check">
            <input type="radio" v-model="user.active" class="form-check-input" id="user-active-2" :value="0">
            <label for="user-active-2" class="form-check-label">Inactive</label>
          </div>
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
        <p v-else>Loading ...</p>
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
import router from "@/router";

export default {
  name: "UserEdit",
  components: {
    FormTag,
    TextInput
  },
  beforeMount() {
    if (parseInt(String(this.$route.params.userId), 10) > 0) {
      // editing an existing user
      fetch(process.env.VUE_APP_API_URL + "/admin/users/get/" + this.$route.params.userId, Security.requestOptions(""))
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              this.$emit('error', data.message)
            } else {
              this.user = data;
              this.ready = true
              // we want password to be empty for existing users
              this.user.password = "";
            }
          })
    } else {
      this.ready = true
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
        active: 0,
      },
      store,
      ready: false,
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
        active: this.user.active,
      }
      fetch(`${process.env.VUE_APP_API_URL}/admin/users/save`, Security.requestOptions(payload))
          .then((response)=>response.json())
          .then((data) => {
            if (data.error) {
              this.$emit('error', data.message)
            } else {
              this.$emit('success', "Changes Saved")
              router.push({name: "Users"})
            }
          })
          .catch((error) => {
            this.$emit('error', error)
      })
    },
    confirmDelete(id){
      notie.confirm({
        text: "Are you sure you want to delete this user?",
        submitText: "Delete",
        submitCallback: function() {
          let payload = {
            id: id,
          }
          fetch(process.env.VUE_APP_API_URL + "/admin/users/delete", Security.requestOptions(payload))
              .then((response)=>response.json())
              .then((data) => {
                if (data.error) {
                  this.$emit('error', data.message)
                } else {
                  // todo: this undefined error, but the user does delete.
                  this.$emit('success', "User Deleted")
                  router.push({name: "Users"})
                }
              })
              .catch((error) => {
                this.$emit('error', error)
              })
        }
      })
    }
  }

}
</script>

<style scoped>

</style>