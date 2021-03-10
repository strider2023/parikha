<template>
  <div>
    <admin-header :currentPage="'questions'" :showNavLinks="true"></admin-header>
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
        <generic-table :data="questions" :currentPage="currentPage" :total="total" :tableConfig="tableConfig"></generic-table>
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
import adminHeader from '../../../components/header/admin-header.vue';
import genericTable from '../../../components/generic-table/generic-table.vue';
export default {
  components: {
    adminHeader,
    genericTable
  },
  data: function () {
    return {
      title: "",
      total: 0,
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
    removeItem: function(id) {
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
    }
  }
};
</script>
