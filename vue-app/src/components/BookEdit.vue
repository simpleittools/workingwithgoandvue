<template>
  <div class="container">
    <div class="row">
      <div class="col">
<!--        <h1 class="mt-3" v-if="this.$route.params === '0'">Add Book</h1>-->
<!--        <h1 class="mt-3" v-else>Edit Book</h1>-->
        <h1 class="mt-3">Add/Edit Book</h1>
        <hr>
        <FormTag @bookEditEvent="submitHandler" name="bookForm" event="bookEditEvent">
          <div v-if="this.book.slug !=''" class="mb-3">
            <img :src="`${this.imgPath}/covers/${this.book.slug}.jpg`" class="img-fluid img-thumbnail book-cover" alt="Book Cover">
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label">Cover Image</label>
            <input v-if="this.book.id === 0" ref="coverInput" class="form-control" type="file" id="formFile"
                   required accept="image/jpeg" @change="loadCoverImage">
            <input v-else ref="coverInput" class="form-control" type="file" id="formFile"
                   accept="image/jpeg" @change="loadCoverImage">
          </div>
          <TextInput
              v-model="book.title"
              type="text"
              required="true"
              label="Title"
              :value="book.title"
              name="title"
          ></TextInput>
          <SelectInput
              name="author-id"
              v-model="this.book.author_id"
              :items="this.authors"
              required="required"
              label="Author"
          ></SelectInput>
          <TextInput
              v-model="book.publication_year"
              type="text"
              required="true"
              label="Publication Year"
              :value="book.publication_year"
              name="publication-year"
          ></TextInput>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea required v-model="book.description" class="form-control" id="description" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label for="genres" class="form-label">Genres</label>
            <select ref="genres"
                    class="form-select"
                    name="genres"
                    id="genres"
                    required
                    size="7"
                    v-model="this.book.genre_ids"
                    multiple
            >
              <option v-for="g in this.genres" :value="g.value" :key="g.value">
                {{g.text}}
              </option>
            </select>
          </div>
          <hr>
          <div class="float-start">
            <input type="submit" class="btn btn-primary me-2" value="Save">
            <router-link :to="{name: 'BooksAdmin'}" class="btn btn-outline-secondary">Cancel</router-link>
          </div>
          <div class="float-end">
            <span v-if="this.book.id>0"
                  class="btn btn-danger clickable"
                  @click="confirmDelete(this.book.id)"
            >Delete</span>
          </div>

        </FormTag>
      </div>
    </div>
  </div>
</template>
<script>
import FormTag from "@/components/forms/FormTag";
import Security from "@/components/security";
import TextInput from "@/components/forms/TextInput";
import SelectInput from "@/components/forms/SelectInput";
import notie from 'notie';
import router from "@/router";

export default {
  name: "BookEdit",
  components: {TextInput, FormTag, SelectInput},
  beforeMount() {
    //get book for edit if id >0
    if (this.$route.params.bookId > 0) {

    } else {

    }

    // get list of authors for drop down
    fetch(process.env.VUE_APP_API_URL +"/admin/authors/all", Security.requestOptions(""))
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.$emit('error', data.message)
          } else {
            this.authors = data.data
          }
        })
        .catch(error => {
          this.$emit('error', error)
        })


  },
  data() {
    return {
      book: {
        id: 0,
        title: "",
        author_id: 0,
        publication_year: 0,
        description: "",
        cover: "",
        slug: "",
        genres: [],
        genre_ids: []
      },
      authors: {},
      imgPath: process.env.VUE_APP_IMAGE_URL,
      genres: [
        {value: 1, text: "Science Fiction"},
        {value: 2, text: "Fantasy"},
        {value: 3, text: "Romance"},
        {value: 4, text: "Thriller"},
        {value: 5, text: "Mystery"},
        {value: 6, text: "Horror"},
        {value: 7, text: "Classic"},
      ]
    }
  },
  methods: {
    submitHandler(){
      const payload = {
        id: this.book.id,
        title: this.book.title,
        author_id: parseInt(this.book.author_id, 10),
        publication_year: this.book.publication_year,
        description: this.book.description,
        cover: this.book.cover,
        slug: this.book.slug,
        genre_ids: this.book.genre_ids,
      }

      fetch(process.env.VUE_APP_API_URL +"/admin/books/save", Security.requestOptions(payload))
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              this.$emit('error', data.message)
            } else {
              this.$emit('success', "changes saved")
              router.push({name: 'BooksAdmin'})
            }
          })
          .catch(error => {
            this.$emit('error', error)
          })

    },
    loadCoverImage() {
      // get reference to input using ref
      const file = this.$refs.coverInput.files[0]

      // encode the file using the FileReader API
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
            .replace("data:", "")
            .replace(/^.+,/, "")
        this.book.cover = base64String
        // alert(base64String)
      }
      reader.readAsDataURL(file)

    },
    confirmDelete(id) {
      notie.confirm({
        test: "Are you sure you want to delete this book?",
        submitText: "Delete",
        submitCallback: () => {
          let payload = {
            id: id,
          }
          fetch(process.env.VUE_APP_API_URL +"/admin/books/delete", Security.requestOptions(payload))
              .then((response) => response.json())
              .then((data) => {
                if (data.error) {
                  this.$emit('error', data.message)
                } else {
                  this.$emit('success', "Book Deleted")
                  router.push({name: 'BooksAdmin'})
                }
              })
              .catch(error => {
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