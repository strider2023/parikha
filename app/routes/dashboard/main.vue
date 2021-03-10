<template>
  <div>
    <admin-header :currentPage="''" :showNavLinks="false"></admin-header>
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
import adminHeader from '../../components/header/admin-header.vue';
export default {
  components: {
    adminHeader
  },
  data: function () {
    return {
      title: "",
    };
  },
  methods: {
    
  }
};
</script>
