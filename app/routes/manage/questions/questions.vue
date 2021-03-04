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
            <li class="nav-item dropdown">
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
              <a class="nav-link" href="/admin/profile">Profile</a>
            </li>
          </ul>
          <button class="btn btn-outline-success" type="submit" v-on:click="logout">Logout</button>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row m-3">
        <div class="shadow-lg p-3 mb-5 bg-white text-black rounded">
            <h1 class="display-6" data-bs-toggle="collapse" href="#collapseFilter" role="button" aria-expanded="false" aria-controls="collapseFilter">Filter</h1>
            <form class="collapse" id="collapseFilter" v-on:submit.prevent="filterList">
                <div class="form-floating mb-3">
                    <input id="tags" class="form-control" type="text" v-model="filter.tag" pattern="[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*"/>
                    <label for="tags" class="form-label">Tags</label>
                    <div id="tagsHelp" class="form-text">Add your subject tags for assessment creation. Use comma without any trailing whitespace to speparate multiple tags.</div>
                </div>
                <div class="mb-3 row">
                  <div class="col-md-6 col-sm-12">
                    <label for="type" class="form-label">Question Type</label>
                    <select id="type" class="form-select" v-model="filter.type">
                        <option value="mcqs">MCQ (Single)</option>
                        <option value="mcqm">MCQ (Multiple)</option>
                        <option value="fixed">Fixed Answer</option>
                        <option value="subjective">Subjective</option>
                    </select>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <label for="complexity" class="form-label">Complexity</label>
                    <select id="complexity" class="form-select" v-model="filter.complexity">
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="difficult">Difficult</option>
                        <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Filter</button>
                <button type="reset" class="btn btn-danger">Clear</button>
            </form>
        </div>
        <table class="table" v-if="questions.lenght != 0">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Question</th>
              <th scope="col">Tags</th>
              <th scope="col">Complexity</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="question in questions" :key="question.id">
              <td scope="col">{{ question.type }}</td>
              <td scope="col">{{ question.question }}</td>
              <td scope="col">{{ question.tags.toString() }}</td>
              <td scope="col">{{ question.complexity }}</td>
              <td scope="col">
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item" v-bind:href="'question/' + question._id">View</a></li>
                    <li><a class="dropdown-item" v-bind:href="'question/' + question._id + '/edit'">Edit</a></li>
                    <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#deleteModal" v-on:click="deleteQuestionPrompt(question._id)">Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation" v-if="questions.length > 0">
          <ul class="pagination justify-content-end">
            <li class="page-item" :class="[(currentPage == '1') ? 'disabled' : '']">
              <a class="page-link" :href="'/admin/questions?page=' + (parseInt(currentPage) - 1) + '&count=' + itemsPerPage">Previous</a>
            </li>
            <li class="page-item" :class="[(currentPage == index) ? 'active' : '']" v-for="index in totalPages" :key="index">
              <a class="page-link" :href="'/admin/questions?page=' + index + '&count=' + itemsPerPage">{{ index }}</a>
            </li>
            <li class="page-item" :class="[(currentPage == totalPages.toString()) ? 'disabled' : '']">
              <a class="page-link" :href="'/admin/questions?page=' + (parseInt(currentPage) + 1) + '&count=' + itemsPerPage">Next</a>
            </li>
          </ul>
        </nav>
        <div class="row text-center justify-content-center" v-if="questions.length == 0">
          <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_h59xofz0.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
          <p class="lead">No Data Found.</p>
        </div>
      </div>

      <!-- Upload Modal -->
      <div class="modal fade" id="uploadModal" tabindex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="uploadModalLabel">Upload Questions Spreadsheet</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="text-center">
                <label for="uploadQuestions" class="form-label">Select File</label>
                <input class="form-control form-control-lg" id="uploadQuestions" type="file" ref="uploadQuestions" v-on:change="handleFileUpload()">
                <p class="m-2">or</p>
                <a class="btn btn-outline-primary" href="../../../assets/templates/parikha-questions-template.xlsx" role="button">Download Template</a>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" v-on:click="submitFile()">Upload</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Delete Modal -->
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Delete Question</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Remove the selected question?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" v-on:click="deleteQuestion()">Remove</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Download Modal -->
      <div class="modal fade" id="downloadModal" tabindex="-1" aria-labelledby="downloadModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="downloadModalLabel">Download Question</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="typeMcqs">
                  <label class="form-check-label" for="typeMcqs">MCQ (Single)</label>
                </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="typeMcqm">
                  <label class="form-check-label" for="typeMcqm">MCQ (Multiple)</label>
                </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="typeFixed">
                  <label class="form-check-label" for="typeFixed">Fixed Answer</label>
                </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="typeSubjective">
                  <label class="form-check-label" for="typeSubjective">Subjective</label>
                </div>
                <div class="mb-3">
                  <label for="tags" class="form-label">Tags</label>
                  <input type="text" class="form-control" id="tags">
              </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger">Download</button>
            </div>
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
      total: 0,
      itemsPerPage: 10,
      filter: {},
      questionsFile: '',
      questionId: '',
      currentPage: 1
    };
  },
  methods: {
    filterList: function() {

    },
    handleFileUpload: function() {
      this.questionsFile = this.$refs.uploadQuestions.files[0];
      console.log(this.questionsFile);
    },
    deleteQuestionPrompt: function(id) {
      console.log(id);
      this.questionId = id;
    },
    deleteQuestion: function() {
      axios.delete( '/admin/question/' + this.questionId).then(result => {
        console.log('called');
        Notiflix.Notify.Success(result.data.message);
        window.location.reload();
      })
      .catch(error => {
        console.error(error.response.data);
        Notiflix.Notify.Failure(error.response.data.message);
      });
    },
    submitFile: function() {
      let formData = new FormData();
      formData.append('uploadQuestions', this.questionsFile);
      axios.post( '/admin/bulk/questions/upload', formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
      ).then(result => {
        console.log('called');
        Notiflix.Notify.Success(result.data.message);
      })
      .catch(error => {
        console.error(error.response.data);
        Notiflix.Notify.Failure(error.response.data.message);
      });
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
  },
  computed: {
    totalPages: function() {
      console.log(Math.ceil(this.total / this.itemsPerPage) + " totalPages");
      return Math.ceil(this.total / this.itemsPerPage);
    }
  }
};
</script>
