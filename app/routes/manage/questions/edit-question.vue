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
              <a class="nav-link active" aria-current="page" href="/admin/dashboard">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin/assessments">Assessments</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin/questions">Questions</a>
            </li>
          </ul>
          <button class="btn btn-outline-success" type="submit">Logout</button>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row m-3">
        <form v-on:submit.prevent="sendData">
          <div class="mb-3">
                <label for="type" class="form-label">Question Type</label>
                <select id="type" class="form-select" v-model="question.type" @change="onQuestionTypeChange">
                    <option value="mcqm">MCQ (Multiple)</option>
                    <option value="mcqs">MCQ (Single)</option>
                    <option value="fixed">Fixed Answer</option>
                    <option value="subjective">Subjective</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="question" class="form-label">Question</label>
                <textarea class="form-control" id="question" v-model="question.question" rows="3"></textarea>
                <div id="questionHelp" class="form-text">Tip: Use HTML tags for rich text.</div>
            </div>
            <div class="mb-3">
                <label for="tags" class="form-label">Tags</label>
                <input type="text" class="form-control" v-model="question.tags" id="tags">
                <div id="tagHelp" class="form-text">Add your subject tags for auto assessment creation.</div>
            </div>
            <div class="mb-3" v-if="!displayOptions">
                <label for="answer" class="form-label">Answer</label>
                <textarea class="form-control" id="answer" v-model="question.answer" rows="3"></textarea>
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
export default {
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
      axios.post("/admin/question", this.question)
        .then(result => {
          // this.result = result.data;
          console.log('called');
          Notiflix.Notify.Success(result.data);
        })
        .catch(error => {
          console.error(error.response.data);
          Notiflix.Notify.Failure(error.response.data.message);
        });
    }
  }
};
</script>
