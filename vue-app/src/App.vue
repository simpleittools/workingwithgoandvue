<template>
  <HeaderComponent />
  <div>
    <router-view @success="success" @error="error" @warning="warning"/>
  </div>
  <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import { store } from "@/components/store";
import notie from 'notie';

const getCookie = (name) => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
}

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data(){
    return {
      store
    }
  },
  methods: {
    success(msg){
      notie.alert({
        type: 'success',
        text: msg
      })
    },
    warning(msg){
      notie.alert({
        type: 'warning',
        text: msg
      })
    },
    error(msg){
      notie.alert({
        type: 'error',
        text: msg
      })
    },
  },
  beforeMount() {
    // check for a cookie
    let data = getCookie("_site_data")

    if (data !== "") {
      let cookieData = JSON.parse(data)

      // update store
      store.token = cookieData.token.token;
      store.user = {
        id: cookieData.user.id,
        first_name: cookieData.user.first_name,
        last_name: cookieData.user.last_name,
        email: cookieData.user.email,
      }
    }
  },
}
</script>

<style>

</style>
