<template>
  <div>
    <admin-header :currentPage="''" :showNavLinks="true"></admin-header>
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
import adminHeader from '../../../components/header/admin-header.vue';
export default {
  components: {
    adminHeader
  },
  data: function () {
    return {
      question: {}
    };
  },
  methods: {

  }
};
</script>
