<template>
  <div>
    <admin-header :currentPage="'assessments'" :showNavLinks="true"></admin-header>
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
        <generic-table :data="assessments" :currentPage="currentPage" :total="total" :tableConfig="tableConfig" :remove="removeItem"></generic-table>
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
      <!-- <delete-modal :modalConfig="modalConfig" :itemId="assessmentId"></delete-modal> -->
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Delete Assessment {{ assessmentId }} </h5>
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
import adminHeader from '../../../components/header/admin-header.vue';
import genericTable from '../../../components/generic-table/generic-table.vue';
import removeModal from '../../../components/delete-modal/delete-modal.vue';
export default {
  components: {
    adminHeader,
    genericTable,
    removeModal
  },
  data: function () {
    return {
      filter: {},
      total: 0,
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
    removeItem: function(id) {
      console.log(id);
      this.assessmentId = id;
    },
    deleteAssessment: function() {
      // console.log(this.assessmentId);
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
