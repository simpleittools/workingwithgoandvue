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
  }
}
</script>

<style>

</style>
