<template>
    <div class="container">
        <div class="text-center">
            <h1 class="display-1 mt-5 mr-5 ml-5">Parīkṣā</h1>
            <p class="lead mb-5">Admin Registration</p>
        </div>
        <form class="shadow-lg p-3 mb-5 bg-white rounded col" v-on:submit.prevent="sendData">
            <div class="form-floating mb-3">
                <input id="name" class="form-control" type="text" v-model="name" required/>
                <label for="name" class="form-label">Name</label>
                <div class="form-text">Enter your name.</div>
            </div>
            <div class="form-floating mb-3">
                <input id="email" class="form-control" type="email" v-model="email" required/>
                <label for="email" class="form-label">Email</label>
                <div class="form-text">Enter your registered email id.</div>
            </div>
            <div class="form-floating mb-3">
                <input id="phone" class="form-control" type="tel" v-model="phone" required/>
                <label for="phone" class="form-label">Phone</label>
                <div class="form-text">Enter your phone number.</div>
            </div>
            <div class="form-floating mb-3">
                <input id="password" class="form-control" type="password" v-model="password" minlength="8" required/>
                <label for="password" class="form-label">Password</label>
                <div class="form-text">Enter your desired password. Note it should be atleast 8 characters long.</div>
            </div>
            <div class="form-floating mb-3">
                <input id="repassword" class="form-control" type="password" v-model="repassword" required/>
                <label for="repassword" class="form-label">Re-Enter Password</label>
                <div class="form-text">Re-Enter your password.</div>
            </div>
            <div class="form-floating mb-3">
                <input id="adminKey" class="form-control" type="text" v-model="adminKey" required/>
                <label for="adminKey" class="form-label">Admin Key</label>
                <div class="form-text">Enter your admin key used at the time of deployment.</div>
            </div>
            <input type="submit" class="btn btn-primary"/>
        </form>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: "",
      result: {},
      error: "",
    };
  },
  methods: {
    sendData: function () {
      const data = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        password: this.password,
        adminKey: this.adminKey,
      };
      axios
        .post("/admin/register", data)
        .then((result) => {
          // this.result = result.data;
          console.log("called");
          Notiflix.Notify.Success(result.data.message);
        })
        .catch((error) => {
          console.log(error.response.data);
          Notiflix.Notify.Failure(error.response.data.message);
        });
    },
  },
};
</script>