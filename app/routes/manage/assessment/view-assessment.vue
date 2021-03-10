<template>
  <div>
    <admin-header :currentPage="''" :showNavLinks="true"></admin-header>
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
import adminHeader from '../../../components/header/admin-header.vue';
export default {
  components: {
    adminHeader
  },
  data: function () {
    return {
      assessment: {}
    };
  },
  methods: {

  }
};
</script>