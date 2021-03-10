<template>
  <div>
    <admin-header :currentPage="''" :showNavLinks="true"></admin-header>
    <div class="container-fluid">
      <div class="row m-3">
        <form v-on:submit.prevent="sendData">
            <div class="row mb-3 ">
              <div class="col-md-6 col-sm-12">
                  <label for="type" class="form-label">Question Type</label>
                  <select id="type" class="form-select" v-model="question.type" @change="onQuestionTypeChange" required>
                      <option value="mcqs">MCQ (Single)</option>
                      <option value="mcqm">MCQ (Multiple)</option>
                      <option value="fixed">Fixed Answer</option>
                      <option value="subjective">Subjective</option>
                  </select>
              </div>
              <div class="col-md-6 col-sm-12">
                  <label for="complexity" class="form-label">Complexity</label>
                  <select id="complexity" class="form-select" v-model="question.complexity" required>
                      <option value="low">Low</option>
                      <option value="moderate">Moderate</option>
                      <option value="difficult">Difficult</option>
                      <option value="expert">Expert</option>
                  </select>
              </div>
            </div>
            <div class="mb-3">
                <label for="question" class="form-label">Question</label>
                <textarea class="form-control" id="question" v-model="question.question" rows="3" required></textarea>
                <div id="questionHelp" class="form-text">Tip: Use HTML tags for rich text.</div>
            </div>
            <div class="mb-3">
                <label for="tags" class="form-label">Tags</label>
                <input type="text" class="form-control" v-model="question.tags" id="tags" pattern="[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*" required>
                <div id="tagHelp" class="form-text">Add your subject tags for assessment creation. Use comma without any trailing whitespace to speparate multiple tags.</div>
            </div>
            <div class="mb-3">
                <label for="answer" class="form-label">Answer</label>
                <textarea class="form-control" id="answer" v-model="question.answer" rows="3" required></textarea>
            </div>
            <div v-if="displayOptions">
              <div class="mb-3">
                <label for="option1" class="form-label">Option 1</label>
                <input type="text" class="form-control" id="option1" v-model="question.option1">
              </div>
              <div class="mb-3">
                  <label for="option2" class="form-label">Option 2</label>
                  <input type="text" class="form-control" id="option2" v-model="question.option2">
              </div>
              <div class="mb-3">
                  <label for="option3" class="form-label">Option 3</label>
                  <input type="text" class="form-control" id="option3" v-model="question.option3">
              </div>
              <div class="mb-3">
                  <label for="option4" class="form-label">Option 4</label>
                  <input type="text" class="form-control" id="option4" v-model="question.option4">
              </div>
            </div>
            <button type="submit" class="btn btn-primary">{{ buttonLabel }}</button>
            <button type="reset" class="btn btn-danger">Clear</button>
        </form>
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
      buttonLabel: "Create",
      question: {
        type: 'mcqm'
      },
      displayOptions: true
    };
  },
  methods: {
    onQuestionTypeChange: function() {
      console.log('called', this.question.type);
      if (this.question.type == 'fixed' || this.question.type == 'subjective') {
        this.displayOptions = false;
      } else {
        this.displayOptions = true;
      }
    },
    sendData: function() {
      console.log(this.question);
      let url = '/admin/question';
      if (this.question.id) {
        url = `/admin/question/${this.question.id}`;
      }
      axios.post(url, this.question)
        .then(result => {
          // this.result = result.data;
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
