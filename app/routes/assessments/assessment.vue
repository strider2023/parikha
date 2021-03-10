<template>
    <div class="container-fluid">
        <div class="row m-2">
            <div class="text-center col-12"> 
                <h1 class="display-1 mt-5">Parīkṣā</h1>
                <p class="lead mb-5">Time Left: <span>{{ timerCount }}</span></p>
            </div>
            <div class="shadow-lg p-3 mb-5 bg-white text-black rounded">
                <form v-on:submit.prevent="sendData(true)">
                    <h4 class="display-6 mb-4">Q. <span>{{ questions[currentQuestion].question }}</span></h4>
                    <div v-if="questions[currentQuestion].type == 'mcqm'">
                        <div class="form-check mb-2" v-for="option in questions[currentQuestion].options" :key="option.id">
                            <input class="form-check-input" type="checkbox" v-bind:value="option.value" v-bind:id="option.id" v-model="checkedAnswers">
                            <label class="form-check-label" v-bind:for="option.id">
                                {{ option.value }}
                            </label>
                        </div>
                    </div>
                    <div v-if="questions[currentQuestion].type == 'mcqs'">
                        <div class="form-check mb-2" v-for="option in questions[currentQuestion].options" :key="option">
                            <input class="form-check-input" type="radio" v-bind:value="option" v-bind:id="option" v-model="answer">
                            <label class="form-check-label" v-bind:for="option">
                                {{ option }}
                            </label>
                        </div>
                    </div>
                    <div v-if="questions[currentQuestion].type == 'fixed'">
                        <div class="form-floating mb-2">
                            <input class="form-control" type="text" placeholder="Enter your answer here." id="fixedAnswer" v-model="answer">
                            <label for="fixedAnswer">Answer</label>
                        </div>
                    </div>
                    <div v-if="questions[currentQuestion].type == 'subjective'">
                        <div class="form-floating mb-2">
                            <textarea class="form-control" placeholder="Enter your answer here." id="subjectiveAnswer" rows="4" v-model="answer"></textarea>
                            <label for="subjectiveAnswer">Answer</label>
                        </div>
                    </div>
                    <button type="button" class="btn btn-warning btn-lg m-2" v-on:click="sendData(false)" v-if="currentQuestion > 0">Previous</button>
                    <button type="button" class="btn btn-success btn-lg m-2" v-on:click="endAssessment()" v-if="currentQuestion == (questions.length - 1)">End Assessment</button>
                    <button type="button" class="btn btn-danger btn-lg m-2" v-on:click="sendData(true)" v-if="currentQuestion < (questions.length - 1)">Next</button>
                </form>
            </div>
            <div class="shadow-lg p-3 mb-5 bg-dark text-white rounded">
                <h1 class="display-6" data-bs-toggle="collapse" href="#collapseInstruction" role="button" aria-expanded="false" aria-controls="collapseInstruction">Questions</h1>
                <div class="list-group collapse" id="collapseInstruction">
                    <a href="#" class="list-group-item list-group-item-action" v-for="question in questions" :key="question.id"> {{ question.question }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      currentQuestion: 0,
      title: "",
      timerCount: 30,
      questions: [],
      error: "",
      answer: "",
      checkedAnswers: [],
      assessmentCode: "",
    };
  },
  methods: {
    sendData: function (isNext) {
      let data = {};
      if (this.questions[this.currentQuestion].type == "mcqm") {
        data = {
          answer: this.checkedAnswers,
        };
      } else {
        data = {
          answer: this.answer,
        };
      }
      console.log(data);
      axios
        .post(
          `/assessment/${this.assessmentCode}/${
            this.questions[this.currentQuestion].questionId
          }`,
          data
        )
        .then((result) => {
          this.answer = "";
          if (isNext && this.currentQuestion < this.questions.length) {
            this.currentQuestion++;
          } else if (!isNext && this.currentQuestion > -1) {
            this.currentQuestion--;
          }
          console.log(this.currentQuestion);
        })
        .catch((error) => {
          this.error = error.data;
          Notiflix.Notify.Failure(error.response.data.message);
        });
    },
    endAssessment: function () {
      let data = {};
      if (this.questions[this.currentQuestion].type == "mcqm") {
        data = {
          answer: this.checkedAnswers,
        };
      } else {
        data = {
          answer: this.answer,
        };
      }
      console.log(data);
      axios
        .post(
          `/assessment/${this.assessmentCode}/${
            this.questions[this.currentQuestion].questionId
          }`,
          data
        )
        .then((result) => {
          window.location.replace(
            `/assessment/${this.assessmentCode}/complete`
          );
        })
        .catch((error) => {
          this.error = error.data;
          Notiflix.Notify.Failure(error.response.data.message);
        });
    },
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        } else {
          // window.location.href = '/assessment/1/complete';
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
};
</script>