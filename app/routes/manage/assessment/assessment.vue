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
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/admin/dashboard">Home</a>
            </li>
            <li class="nav-item dropdown">
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
            <li class="nav-item">
              <a class="nav-link" href="/admin/questions">Questions</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin/profile">Profile</a>
            </li>
          </ul>
          <button class="btn btn-outline-success" type="submit" v-on:click="logout()">
              Logout
          </button>
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
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email Id</th>
              <th scope="col">Assessment Code</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="assessment in assessments" :key="assessment._id">
              <td scope="col">{{ assessment.name }}</td>
              <td scope="col">{{ assessment.email }}</td>
              <td scope="col">{{ assessment.assessmentCode }}</td>
              <td scope="col">{{ assessment.assessmentStatus }}</td>
              <td scope="col">
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item" v-bind:href="'/admin/assessment/' + assessment._id">View</a></li>
                    <li><a class="dropdown-item" v-bind:href="'/admin/assessment/' + assessment._id + '/edit'">Edit</a></li>
                    <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#deleteModal" v-on:click="deleteAssessmentPrompt(assessment._id)">Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Upload Modal -->
      <div class="modal fade" id="uploadModal" tabindex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="uploadModalLabel">Upload Assessments Spreadsheet</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div>
                <label for="formFileLg" class="form-label">Select File</label>
                <input class="form-control form-control-lg" id="formFileLg" type="file">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Upload</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Delete Modal -->
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Delete Assessment</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Remove the selected assessment?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" v-on:click="deleteAssessment()">Remove</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Download Modal -->
      <div class="modal fade" id="downloadModal" tabindex="-1" aria-labelledby="downloadModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="downloadModalLabel">Download Assessment Report</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label class="form-check-label" for="downloadToDate">From:</label>
                  <input type="date" class="form-control" id="downloadToDate" v-model="downloadFilter.toDate">
                </div>
                <div class="mb-3">
                  <label class="form-check-label" for="downloadFromDate">To:</label>
                  <input type="date" class="form-control" id="downloadFromDate" v-model="downloadFilter.fromDate">
                </div>
                <div class="mb-3">
                    <label for="downloadByStatus" class="form-label">Assessment Status</label>
                    <select id="downloadByStatus" class="form-select" v-model="downloadFilter.status">
                        <option value="PENDING">Scheduled Assessments</option>
                        <option value="ASSESSMENT_COMPLETE">Assessments Pending</option>
                        <option value="REVIEW_PENDING">Review Pending</option>
                        <option value="COMPLETE">Completed Assessments</option>
                    </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" v-on:click="downloadAssessmentsReport()">Download</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Purge Assessements Modal -->
      <div class="modal fade" id="purgeAssessmentsModal" tabindex="-1" aria-labelledby="purgeAssessmentsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="purgeAssessmentsModalLabel">Purge Assessments</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label class="form-check-label" for="purgeToDate">From:</label>
                  <input type="date" class="form-control" id="purgeToDate" v-model="deleteFilter.toDate">
                </div>
                <div class="mb-3">
                  <label class="form-check-label" for="purgeFromDate">To:</label>
                  <input type="date" class="form-control" id="purgeFromDate" v-model="deleteFilter.fromDate">
                </div>
                <div class="mb-3">
                    <label for="purgeByStatus" class="form-label">Assessment Status</label>
                    <select id="purgeByStatus" class="form-select" v-model="deleteFilter.status">
                        <option value="PENDING">Scheduled Assessments</option>
                        <option value="ASSESSMENT_COMPLETE">Assessments Pending</option>
                        <option value="REVIEW_PENDING">Review Pending</option>
                        <option value="COMPLETE">Completed Assessments</option>
                    </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" v-on:click="purgeAssessments()">Delete</button>
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
      filter: {},
      downloadFilter: {},
      deleteFilter: {},
      assessments: [],
      assessmentId: ''
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
    },
    downloadAssessmentsReport: function() {

    },
    purgeAssessments: function() {

    },
    deleteAssessmentPrompt: function(id) {
      console.log(id);
      this.assessmentId = id;
    },
    deleteAssessment: function() {
      axios.delete( '/admin/assessment/' + this.assessmentId).then(result => {
        console.log('called');
        Notiflix.Notify.Success(result.data.message);
        window.location.reload();
      })
      .catch(error => {
        console.error(error.response.data);
        Notiflix.Notify.Failure(error.response.data.message);
      });
    }
  }
};
</script>
