<template>
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
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!showNavLinks"></ul>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="showNavLinks">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/admin/dashboard">Home</a>
            </li>
            <li class="nav-item" v-if="currentPage != 'assessments'">
              <a class="nav-link" aria-current="page" href="/admin/assessments">Assessments</a>
            </li>
            <li class="nav-item dropdown" v-if="currentPage == 'assessments'">
              <a class="nav-link active dropdown-toggle" href="#" id="navbarDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Assessments
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/admin/create/assessment">Add assessment</a></li>
                <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#uploadModal">Bulk Add</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#downloadModal">Download Report</a>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#purgeAssessmentsModal">Purge Old Assessments</a>
                </li>
              </ul>
            </li>
            <li class="nav-item" v-if="currentPage != 'questions'">
              <a class="nav-link" href="/admin/questions">Questions</a>
            </li>
            <li class="nav-item dropdown" v-if="currentPage == 'questions'">
              <a class="nav-link active dropdown-toggle" href="#" id="navbarDropdown"
                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Questions
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/admin/create/question">Add Question</a></li>
                <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#uploadModal">Bulk Upload</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#"  data-bs-toggle="modal" data-bs-target="#downloadModal">Download Questions</a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="[(currentPage == 'profile') ? 'active' : '']" href="/admin/profile">Profile</a>
            </li>
          </ul>
          <button class="btn btn-outline-success" type="submit" v-on:click="logout()">
              Logout
          </button>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  name: "admin-header",
  props: ['currentPage', 'showNavLinks'],
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
  },
};
</script>

<style></style>