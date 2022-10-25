<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Books'}">Books</router-link>
          </li>
          <li class="nav-item dropdown" v-if="store.token !== ''">
            <a href="#" class="nav-link dropdown-toggle" id="navBarDropDown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Admin</a>
            <ul class="dropdown-menu" aria-labelledby="navBarDropDown">
              <li>
                <router-link class="dropdown-item" :to="{name: 'Users'}">Manage Users</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" :to="{name: 'UserEdit', params:{userId: 0} }">Add User</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" :to="{name: 'BooksAdmin'}">Manage Books</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" :to="{name: 'BookEdit', params:{bookId: 0} }">Add Book</router-link>
              </li>
            </ul>
          </li>


          <li class="nav-item">
            <router-link v-if="store.token === ''" class="nav-link" :to="{name: 'Login'}">Login</router-link>
            <span v-else class="nav-link" id="logout" @click="logout">Logout</span>
          </li>
        </ul>

        <span class="navbar-text">{{store.user.first_name ?? ''}}</span>
      </div>
    </div>
  </nav>
</template>

<script>
import { store } from "@/components/store";
import router from "@/router";
export default {
  name: "HeaderComponent",
  data() {
    return {
      store
    }
  },
  methods: {
    logout() {
      const payload = {
        token: store.token,
      }

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(payload),
      }

      fetch("http://localhost:8081/users/logout", requestOptions)
          .then((response) => response.json)
          .then((response) => {
            if (response.error) {
              console.log(response.message)
            } else {
              store.token = "";
              store.user = {};
              document.cookie = "_site_data=; Path=/; SameSite=Strict; Secure; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
              router.push({name: 'Login'})
            }
          })
    }
  }
}
</script>

<style scoped>
 #logout {
   cursor: pointer;
 }
</style>