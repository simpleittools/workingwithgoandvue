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
import notie  from 'notie';

export default {
  name: "BookEdit",
  components: {TextInput, FormTag, SelectInput},
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

    },
    loadCoverImage() {

    }
  }
}
</script>

<style scoped>


</style>