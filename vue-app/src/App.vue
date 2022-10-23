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

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent

  }
}
</script>

<style>

</style>
