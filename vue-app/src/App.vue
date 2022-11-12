<template>
  <HeaderComponent />
  <div>
    <router-view v-slot="{Component}" :key="componentKey" @success="success" @error="error" @warning="warning" @forceUpdate="forceUpdate">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
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
      store,
      componentKey: 0,
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
    forceUpdate() {
      this.componentKey += 1;
    }
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

.clickable {
  cursor: pointer;
}

</style>
