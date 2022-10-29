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

    }
}

export default Security