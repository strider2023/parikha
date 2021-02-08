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
              <a class="nav-link" aria-current="page" href="/admin/assessments">Assessments</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin/questions">Questions</a>
            </li>
          </ul>
          <button class="btn btn-outline-success" type="submit" v-on:click="logout">Logout</button>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row m-3">
        <div class="shadow-lg p-5 mb-5 bg-white text-black rounded">
          <p class="display-6">Assessment Code: <strong>{{ assessment.assessmentCode }}</strong></p>
          <p class="lead">Assessee Name: <strong>{{ assessment.name }}</strong></p>
          <p class="lead">Assessee Mail Id: <strong>{{ assessment.email }}</strong></p>
          <p class="lead">Assessee Status: <strong>{{ assessment.assessmentStatus }}</strong></p>
          <hr class="dropdown-divider">
          <p>Assessment Time: <strong>{{ assessment.time }}</strong></p>
          <p>Assessment Start Date: <strong>{{ assessment.assessmentStart }}</strong></p>
          <p>Assessment End Date: <strong>{{ assessment.assessmentExpiry }}</strong></p>
          <p>Assessment Total Question Count: <strong>{{ assessment.totalQuestions }}</strong></p>
        </div>
        <!-- <hr class="dropdown-divider"> -->
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Complexity</th>
              <th scope="col">Tags</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detail in assessment.details">
              <td scope="col">{{ detail.complexity }}</td>
              <td scope="col">{{ detail.tag }}</td>
              <td scope="col">{{ detail.count }}</td>
            </tr>
          </tbody>
        </table>
        <a class="btn btn-primary" v-bind:href="'/admin/assessment/' + assessment._id + '/edit'" role="button">Edit Assessment</a>
        <!-- <div v-for="(detail, index) in assessment.details">
          <p>Complexity: {{ detail.complexity }}</p>
          <p>Tags: {{ detail.tag }}</p>
          <p>Count: {{ detail.count }}</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      assessment: {}
    };
  },
  methods: {
    logout: function() {
      axios.get("/admin/logout")
        .then(result => {
          // this.result = result.data;
          console.log('called');
        })
        .catch(error => {
          console.error(error.response.data);
          Notiflix.Notify.Failure(error.response.data.message);
        });
    }
  }
};
</script>