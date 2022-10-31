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

        </FormTag>
      </div>
    </div>
  </div>
</template>

<script>
import FormTag from "@/components/forms/FormTag";
import TextInput from "@/components/forms/TextInput";
import notie from 'notie'
// import Security from "@/components/security";
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
      }
    }
  },
  methods: {
    submitHandler() {

    }
  }

}
</script>

<style scoped>

</style>