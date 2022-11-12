<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">All Books</h1>
      </div>
      <hr>
      <div class="filters text-center">
        <span class="filter me-1" :class="{active: currentFilter === 0}" @click="setFilter(0)">ALL</span>
        <span class="filter me-1" :class="{active: currentFilter === 2}" @click="setFilter(2)">FANTASY</span>
        <span class="filter me-1" :class="{active: currentFilter === 7}" @click="setFilter(3)">ROMANCE</span>
        <span class="filter me-1" :class="{active: currentFilter === 6}" @click="setFilter(6)">HORROR</span>
        <span class="filter me-1" :class="{active: currentFilter === 4}" @click="setFilter(4)">THRILLER</span>
        <span class="filter me-1" :class="{active: currentFilter === 1}" @click="setFilter(1)">SCIENCE FICTION</span>
        <span class="filter me-1" :class="{active: currentFilter === 5}" @click="setFilter(5)">MYSTERY</span>
      </div>
      <hr>
      <div>
        <div class="card-group">
          <transition-group class="p-3 d-flex flex-wrap" tag="div" apppear name="books">
            <div v-for="b in this.books" :key="b.id">
              <div class="card me-2 ms-1 mb-3" style="width: 10rem;"
                   v-if="b.genre_ids.includes(currentFilter) || currentFilter === 0">
                <router-link :to="{name: 'Book', params: {bookName:b.slug}}">
                  <img :src="`${this.imgPath}/covers/${b.slug}.jpg`" class="card-img-top" :alt="`cover for ${b.title}`">
                </router-link>
                <div class="card-body text-center">
                  <h6 class="card-title">{{b.title}}</h6>
                  <span class="book-author">{{b.author.author_name}}</span><br>
                  <small class="text-muted book-genre" v-for="(g, index) in b.genres" :key="g.id">
                    <em class="me-1">{{g.genre_name}}<template v-if="index !== (b.genres.length -1)">,</template></em>
                  </small>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from "@/components/store";
export default {
  name: "Books",
  data() {
    return {
      store,
      ready: false,
      imgPath: process.env.VUE_APP_IMAGE_URL,
      books: {},
      currentFilter: 0,
    }
  },
  emit: ['error'],
  beforeMount() {
    fetch(process.env.VUE_APP_API_URL + "/books")
        .then((response) => response.json())
        .then((response) => {
          if (this.error) {
            this.$emit('error', response.message)
          } else {
            this.books = response.data.books
            this.ready = true
          }
        })
        .catch(error => {
          this.$emit('error', error)
        })
  },
  methods: {
    setFilter: function(filter) {
      this.currentFilter = filter;
    }
  }
}
</script>

<style scoped>
.book-author, .book-genre {
  font-size: 0.8em;
}

.filter {
  padding: 6px 6px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.35s;
  border: 1px solid silver;
}

.filters {
  height: 2.5em;
}

.filter.active {
  background: lightgreen;
}

.filter:hover{
  background: lightgray;
}

/* Transition Styles */
.books-move {
  transition: all 500ms ease-in-out 50ms;
}

.books-enter-active {
  transition: all 500ms ease-in-out;
}

.books-leave-active {
  transition: all 500ms ease-in;
}

.books-enter, .books-leave-to {
  opacity: 0;
}

</style>