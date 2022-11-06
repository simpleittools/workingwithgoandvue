import {store} from "@/components/store";
import router from "@/router";

let Security = {
  // make sure user is authenticated
  requireToken: function() {
    if (store.token === "") {
      router.push({name: "Login"})
      return false
    }
  },

  // create request options and send them back
  requestOptions: function(payload) {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", "Bearer " + store.token)

    return {
      method: "POST",
      body: JSON.stringify(payload),
      headers: headers,
    }

  },

  // check token
  checkToken: function() {
    if (store.token !== "") {
      const payload = {
        token: store.token
      }
      const headers = new Headers()
      headers.append("Content-Type", "application/json")

      let requestOptions = {
        method: "POST",
        body: JSON.stringify(payload),
        header: headers
      }

      fetch(process.env.VUE_APP_API_URL + "/validate-token", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if(data.error) {
            console.log(data.error)
            // this.$emit("error", data.message)
          } else {
            if (!data.data) {
              store.token = ""
              store.user = {}
              document.cookie = "_site_data=; Path=/; SameSite=strict;" /*Secure;*/ + "Expires=Thu, 01 Jan 1970 00:00:01 GMT;"

            }
            // this.$emit("success", data.message)
            // this.$emit("forceUpdate")
          }
        })
    }
  }
}

export default Security