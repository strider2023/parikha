<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Parīkṣā</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/admin/dashboard">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin/assessments">Assessments</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin/questions">Questions</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Profile</a>
            </li>
          </ul>
          <button class="btn btn-outline-success" v-on:click="logout">Logout</button>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row m-2">
          <ul class="list-group col-md-3 col-sm-12 p-1 mb-2">
            <button class="list-group-item list-group-item-action" v-bind:class="{ active: currentTab == 0 }" v-on:click="switchPane(0)">My Profile</button>
            <button class="list-group-item list-group-item-action" v-bind:class="{ active: currentTab == 1 }" v-on:click="switchPane(1)">Edit Personal Details</button>
            <button class="list-group-item list-group-item-action" v-bind:class="{ active: currentTab == 2 }" v-on:click="switchPane(2)">Update Password</button>
          </ul>
          <div class="col-md-9 col-sm-12 mt-2">
              <div id="basic" class="shadow-lg p-3 bg-white rounded" v-if="currentTab == 0">
                <p class="display-6">User Profile Details</p>
                <p class="lead">Name: <strong>{{ user.name }}</strong></p>
                <p class="lead">Email: <strong>{{ user.email }}</strong></p>
                <p class="lead">Phone: <strong>{{ user.phone }}</strong></p>
              </div>
              <div id="editDetails" class="shadow-lg p-3 bg-white rounded" v-if="currentTab == 1">
                <p class="display-6">Update User Details</p>
                <form v-on:submit.prevent="updateProfile">
                  <div class="form-floating mb-3">
                      <input id="name" class="form-control" type="text" v-model="updateDeatils.name" required/>
                      <label for="name" class="form-label">Name</label>
                  </div>
                  <div class="form-floating mb-3">
                      <input id="phone" class="form-control" type="tel" v-model="updateDeatils.phone" required/>
                      <label for="re-password" class="form-label">Phone Number</label>
                  </div>
                  <button type="submit" class="btn btn-primary">Update</button>
                  <button type="reset" class="btn btn-danger">Clear</button>
                </form>
              </div>
              <div id="editPassword" class="shadow-lg p-3 bg-white rounded" v-if="currentTab == 2">
                <p class="display-6">Update Password</p>
                <form v-on:submit.prevent="updateUserPassword">
                   <div class="form-floating mb-3">
                      <input id="password" class="form-control" type="password" v-model="updatePassword.password" minlength="8" required/>
                      <label for="password" class="form-label">Password</label>
                  </div>
                  <div class="form-floating mb-3">
                      <input id="re-password" class="form-control" type="password" v-model="updatePassword.re_password" minlength="8" required/>
                      <label for="re-password" class="form-label">Re-Enter Password</label>
                  </div>
                  <button type="submit" class="btn btn-primary">Update</button>
                  <button type="reset" class="btn btn-danger">Clear</button>
                </form>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      user: {},
      updateDeatils:{},
      updatePassword:{},
      currentTab: 0
    };
  },
  methods: {
    updateProfile: function() {
      const data = {
        name: this.updateDeatils.name,
        phone: this.updateDeatils.phone,
      }
      axios.post("/admin/profile", data)
        .then(result => {
            console.log('called');
            this.user.name = this.updateDeatils.name;
            this.user.phone = this.updateDeatils.phone;
            Notiflix.Notify.Success(result.data.message);
          })
          .catch(error => {
            console.error(error.response.data);
            Notiflix.Notify.Failure(error.response.data.message);
          });
    },
    updateUserPassword: function() {
      if (this.updatePassword.password == this.updatePassword.re_password) {
        const data = {
          password: this.updatePassword.password
        }
        axios.post("/admin/password", data)
          .then(result => {
            console.log('called');
            Notiflix.Notify.Success(result.data.message);
          })
          .catch(error => {
            console.error(error.response.data);
            Notiflix.Notify.Failure(error.response.data.message);
          });
      } else {
        Notiflix.Notify.Failure('Password mismatch.');
      }
    },
    switchPane: function(id) {
      this.currentTab = id;
    },
    logout: function() {
      axios.get("/admin/logout")
        .then(result => {
          // this.result = result.data;
          console.log('called');
          window.location.replace('/admin');
        })
        .catch(error => {
          console.error(error.response.data);
          Notiflix.Notify.Failure(error.response.data.message);
        });
    }
  }
};
</script>
