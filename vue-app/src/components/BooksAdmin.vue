<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">Manage Books</h1>
        <hr>
        <table v-if="this.ready" class="table table-striped table-compact">
          <thead>
            <tr>
              <th>Book</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in this.books" :key="b.id">
              <td>
                <router-link :to="{name: 'BookEdit', params:{bookId: b.id}}">{{b.title}}</router-link>
              </td>
              <td>{{b.author.author_name}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BooksAdmin",
  data() {
    return {
      books: {},
      ready: false,
    }
  },
  mounted() {
    fetch(process.env.VUE_APP_API_URL + "/books")
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.$emit('error', data.message)
          } else {
            this.books = data.data.books
            this.ready = true
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