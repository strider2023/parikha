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
          <button class="btn btn-outline-success" type="submit" v-on:click="logout">
              Logout
          </button>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row m-3">
        <form v-on:submit.prevent="sendData">
            <div class="row mb-3">
              <div class="col-md-6 col-sm-12">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" class="form-control" id="name" v-model="assessment.name" required>
                  <div id="nameHelp" class="form-text">Assessee name.</div>
              </div>
              <div class="col-md-6 col-sm-12">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" v-model="assessment.email" required>
                  <div id="emailHelp" class="form-text">Assessee email.</div>
              </div>
              <div class="col-md-6 col-sm-12">
                  <label for="time" class="form-label">Duration</label>
                  <input type="number" class="form-control" id="time" v-model="assessment.time" pattern="^[1-9][0-9]*$" required>
                  <div id="questionHelp" class="form-text">Assessment duration in minutes.</div>
              </div>
              <div class="col-md-6 col-sm-12">
                  <label for="start" class="form-label">Assessment Start Date</label>
                  <input type="date" class="form-control" id="start" v-model="assessment.assessmentStart" required>
                  <div id="questionHelp" class="form-text">When will the assessee be able to start taking the assessment.</div>
              </div>
              <div class="col-md-6 col-sm-12">
                  <label for="end" class="form-label">Assessment Expiry Date</label>
                  <input type="date" class="form-control" id="end" v-model="assessment.assessmentExpiry" required>
                  <div id="questionHelp" class="form-text">By when the assessment link will expire.</div>
              </div>
            </div>
            <div class="row shadow-lg p-3 mb-5 mt-5 bg-white rounded">
              <h1 class="display-6">Questions</h1>
              <hr class="dropdown-divider">
              <div class="row mb-3" v-for="(detail, index) in assessment.details">
                <div class="col-md-3 col-sm-12">
                    <label for="complexity" class="form-label">Complexity</label>
                    <select id="complexity" class="form-select" v-model="detail.complexity" required>
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="difficult">Difficult</option>
                        <option value="expert">Expert</option>
                    </select>
                    <div id="tagHelp" class="form-text">Question complexity.</div>
                </div>
                <div class="col-md-5 col-sm-12">
                    <label for="tags" class="form-label">Tags</label>
                    <input type="text" class="form-control" v-model="detail.tag" id="tags" pattern="[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*" required>
                    <div id="tagHelp" class="form-text">Add your subject tags for assessment creation. Use comma without any trailing whitespace to speparate multiple tags.</div>
                </div>
                <div class="col-md-3 col-sm-12">
                    <label for="question" class="form-label">Count</label>
                    <input type="number" class="form-control" id="start" v-model="detail.count" pattern="^[1-9][0-9]*$" required>
                    <div id="questionHelp" class="form-text">Total number of questions for the given complexity and tag.</div>
                </div>
                <button class="btn-close" aria-label="Close" @click="removeDetail(index)"></button>
              </div>
              <hr class="dropdown-divider">
              <h6 class="lead m-3" style="cursor: pointer;" @click="addDetail">Add More</h6>
            </div>
            <button type="submit" class="btn btn-primary">{{ buttonLabel }}</button>
            <button type="reset" class="btn btn-danger">Clear</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      buttonLabel: "",
      assessment: {
        details:[{ complexity: '', tag: '', count: 0}]
      }
    };
  },
  methods: {
    sendData: function() {
      let totalCount = 0;
      for(const detail of this.assessment.details) {
        totalCount += detail.count;
      }
      this.assessment['totalQuestions'] = totalCount;
      console.log(JSON.stringify(this.assessment));
      let url = '/admin/assessment';
      if (this.assessment._id) {
        url = `/admin/assessment/${this.assessment._id}`;
      }
      axios.post(url, this.assessment)
        .then(result => {
          // this.result = result.data;
          console.log('called');
          Notiflix.Notify.Success(result.data.message);
        })
        .catch(error => {
          console.error(error.response.data);
          Notiflix.Notify.Failure(error.response.data.message);
        });
    },
    addDetail: function() {
      this.assessment.details.push({ complexity: '', tag: '', count: 0});
    },
    removeDetail: function(index) {
      console.log(index);
      this.assessment.details.splice(index, 1);
    },
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
