<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2">
        <img :src="`${imgPath}/covers/${book.slug}.jpg`" alt="cover" class="img-fluid img-thumbnail">
      </div>
      <div class="col-md-10">
        <h3 class="mt-3">{{book.title}}</h3>
        <p>
          <strong>Author:</strong> {{book.author.author_name}}<br>
          <strong>Published:</strong> {{book.publication_year}}
        </p>
        <p>
          {{book.description}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: "Book",
  data() {
    return {
      book: {},
      imgPath: process.env.VUE_APP_IMAGE_URL,
    }
  },
  created() {
    fetch(process.env.VUE_APP_API_URL +"/books/" + this.$route.params.bookName)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.$emit('error', data.message)
          } else {
            this.book = data.data
            // console.log("Title is", this.book.title)
            // this.ready = true
          }
        })
        .catch(error => {
          this.$emit('error', error)
        })
  },
}

</script>

<style scoped>

</style>