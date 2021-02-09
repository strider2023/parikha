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
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <button class="btn btn-outline-success" v-on:click="logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row m-3">
        <div class="col-12">
          <div class="shadow-lg p-3 mb-5 bg-white rounded row">
            <h1 class="display-1">Overview</h1>
            <p class="lead">Monthly overview of assessments statuses.</p>
            <hr class="dropdown-divider"/>
            <div class="col text-center">
              <h1 class="display-3">0</h1>
              <p class="lead">Scheduled Assessments</p>
            </div>
            <div class="col text-center">
              <h1 class="display-3">0</h1>
              <p class="lead">Assessments Pending</p>
            </div>
            <div class="col text-center">
              <h1 class="display-3">0</h1>
              <p class="lead">Review Pending</p>
            </div>
            <div class="col text-center">
              <h1 class="display-3">0</h1>
              <p class="lead">Completed Assessments</p>
            </div>        
          </div>
        </div>
        <div class="card shadow-lg m-2" style="width: 18rem">
          <img src="../../assets/images/questions.png" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Questions</h5>
            <p class="card-text">
              Create, edit or remove interview questions and tag them to various categories.
            </p>
            <a href="/admin/questions" class="btn btn-primary">Manage Questions</a>
          </div>
        </div>

        <div class="card shadow-lg m-2" style="width: 18rem">
          <img src="../../assets/images/interview.png" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Assessments</h5>
            <p class="card-text">
              Create, edit or remove interviews. Download and view reports.
            </p>
            <a href="/admin/assessments" class="btn btn-primary">Manage Assessments</a>
          </div>
        </div>

        <div class="card shadow-lg m-2" style="width: 18rem">
          <img src="../../assets/images/profile.png" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Profile</h5>
            <p class="card-text">
              View or make updates to your profile like name, email, passwords etc.
            </p>
            <a href="/admin/profile" class="btn btn-primary">Manage Profile</a>
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
      title: "",
    };
  },
  methods: {
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
