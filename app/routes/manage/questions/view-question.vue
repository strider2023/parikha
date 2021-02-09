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
          </ul>
          <button class="btn btn-outline-success" type="submit" v-on:click="logout">Logout</button>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row m-3">
        <div class="text-center col-12"> 
          <h1 class="display-1 mt-5">{{ question.question }}</h1>
          <p class="lead" v-if="question.type == 'mcqs'">Type MCQ (Single Answer)</p>
          <p class="lead" v-if="question.type == 'mcqm'">Type MCQ (Multiple Answer)</p>
          <p class="lead" v-if="question.type == 'fixed'">Fixed Answer (Exact Match)</p>
          <p class="lead" v-if="question.type == 'subjective'">Subjective Answer (Required evaluation post assessment)</p>
          <p class="lead mb-5">Subject Tags: <b>{{ question.tags }}</b></p>
        </div>
        <h1 class="display-6 mb-5">Answer: {{ question.answer }}</h1>
        <div class="shadow-lg p-3 mb-5 bg-dark text-white rounded" v-if="question.type == 'mcqs' || question.type == 'mcqm'">
          <h1 class="display-6">Options:</h1>
          <p class="lead mb-2">A. <b>{{ question.option1 }}</b></p>
          <p class="lead mb-2">B. <b>{{ question.option2 }}</b></p>
          <p class="lead mb-2">C. <b>{{ question.option3 }}</b></p>
          <p class="lead mb-2">D. <b>{{ question.option4 }}</b></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      question: {}
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
