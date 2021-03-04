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
                <div class="mb-3 row">
                  <div class="col-md-6 col-sm-12">
                    <label class="form-check-label" for="filterFromDate">From:</label>
                    <input type="date" class="form-control" id="filterFromDate" v-model="filter.fromDate">
                    <div id="filterFormHelp" class="form-text">Assessment start date.</div>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <label class="form-check-label" for="filterToDate">To:</label>
                    <input type="date" class="form-control" id="filterToDate" v-model="filter.fromDate">
                    <div id="filterToHelp" class="form-text">Assessment end date.</div>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <label for="filterStatus" class="form-label">Assessment Status:</label>
                    <select id="filterStatus" class="form-select" v-model="filter.status">
                        <option value="PENDING">Scheduled Assessments</option>
                        <option value="IN_PROGRESS">Assessments In Progress</option>
                        <option value="REVIEW_PENDING">Review Pending</option>
                        <option value="COMPLETE">Completed Assessments</option>
                        <option value="EXPIRED">Expired Assessments</option>
                    </select>
                    <div id="filterStatusHelp" class="form-text">Filter by assessment status.</div>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Filter</button>
                <button type="reset" class="btn btn-danger">Clear</button>
            </form>
        </div>
        <table class="table" v-if="assessments.length > 0">
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
        <nav aria-label="Page navigation" v-if="assessments.length > 0">
          <ul class="pagination justify-content-end">
            <li class="page-item" :class="[(currentPage == '1') ? 'disabled' : '']">
              <a class="page-link" :href="'/admin/assessments?page=' + (parseInt(currentPage) - 1) + '&count=' + itemsPerPage">Previous</a>
            </li>
            <li class="page-item" :class="[(currentPage == index) ? 'active' : '']" v-for="index in totalPages" :key="index">
              <a class="page-link" :href="'/admin/assessments?page=' + index + '&count=' + itemsPerPage">{{ index }}</a>
            </li>
            <li class="page-item" :class="[(currentPage == totalPages.toString()) ? 'disabled' : '']">
              <a class="page-link" :href="'/admin/assessments?page=' + (parseInt(currentPage) + 1) + '&count=' + itemsPerPage">Next</a>
            </li>
          </ul>
        </nav>
        <div class="row text-center justify-content-center" v-if="assessments.length == 0">
          <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_h59xofz0.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
          <p class="lead">No Data Found.</p>
        </div>
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
                        <option value="IN_PROGRESS">Assessments In Progress</option>
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
      total: 0,
      itemsPerPage: 10,
      downloadFilter: {},
      deleteFilter: {},
      assessments: [],
      assessmentId: '',
      currentPage: 1
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
  },
  computed: {
    totalPages: function() {
      console.log(Math.ceil(this.total / this.itemsPerPage) + " totalPages");
      return Math.ceil(this.total / this.itemsPerPage);
    }
  }
};
</script>
