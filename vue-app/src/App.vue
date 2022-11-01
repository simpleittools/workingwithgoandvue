<template>
  <HeaderComponent />
  <div>
    <router-view />
  </div>
  <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import { store } from "@/components/store";

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
  }, beforeMount() {
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
  // mounted() {
  //   const payload = {
  //     foo: "bar"
  //   }
  //   const headers = new Headers()
  //   headers.append("Content-Type", "application/json")
  //   headers.append("Authorization", "Bearer " + store.token)
  //
  //   const requestOptions = {
  //     method: "POST",
  //     body: JSON.stringify(payload),
  //     headers: headers,
  //   }
  //
  //   fetch("http://localhost:8081/admin/foo", requestOptions)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data)
  //       })
  // }
}
</script>

<style>

</style>
