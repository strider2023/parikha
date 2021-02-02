<template>
    <div class="container-fluid">
        <div class="row m-2">
            <div class="text-center col-12"> 
                <h1 class="display-1 mt-5">{{title}}</h1>
                <p class="lead mb-5">Time Left: <span>{{ timerCount }}</span></p>
            </div>
            <div class="shadow-lg p-3 mb-5 bg-white text-black rounded">
                <form v-on:submit.prevent="sendData">
                    <h4 class="display-6 mb-4">Q. <span>{{ assessment.question }}</span></h4>
                    <div v-if="assessment.type == 'mcqm'">
                        <div class="form-check mb-2" v-for="option in assessment.options" :key="option.id">
                            <input class="form-check-input" type="checkbox" v-bind:value="option.value" v-bind:id="option.id" v-model="checkedAnswers">
                            <label class="form-check-label" v-bind:for="option.id">
                                {{ option.value }}
                            </label>
                        </div>
                    </div>
                    <div v-if="assessment.type == 'mcqs'">
                        <div class="form-check mb-2" v-for="option in assessment.options" :key="option.value">
                            <input class="form-check-input" type="radio" v-bind:value="option.value" v-bind:id="option.id" v-model="answer">
                            <label class="form-check-label" v-bind:for="option.id">
                                {{ option.value }}
                            </label>
                        </div>
                    </div>
                    <div v-if="assessment.type == 'fixed'">
                        <div class="form-floating mb-2">
                            <input class="form-control" type="text" placeholder="Enter your answer here." id="fixedAnswer" v-model="answer">
                            <label for="fixedAnswer">Answer</label>
                        </div>
                    </div>
                    <div v-if="assessment.type == 'subjective'">
                        <div class="form-floating mb-2">
                            <textarea class="form-control" placeholder="Enter your answer here." id="subjectiveAnswer" rows="4" v-model="answer"></textarea>
                            <label for="subjectiveAnswer">Answer</label>
                        </div>
                    </div>
                    <button type="button" class="btn btn-warning btn-lg m-2">Previous</button>
                    <button type="submit" class="btn btn-success btn-lg m-2">Sumbit</button>
                    <button type="button" class="btn btn-danger btn-lg m-2">Next</button>
                    <!-- <input type="submit" class="btn btn-primary btn-lg"/>
                    <input type="submit" class="btn btn-primary"/>
                    <input type="submit" class="btn btn-primary"/> -->
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
        data: function() {
            return {
                title: "",
                timerCount: 30,
                questions: [],
                assessment: {},
                error: "",
                answer: "",
                checkedAnswers: []
            }
        },
        methods: {
            sendData: function() {
                let data = {};
                if (this.assessment.type == 'mcqm') {
                    data = {
                        id: this.assessment.id,
                        answer: this.checkedAnswers
                    }
                } else {
                    data = {
                        id: this.assessment.id,
                        answer: this.answer
                    }
                }
                console.log(data);
                axios.post("/assessment/1", data)
                    .then(result => {
                        this.checkedAnswers = [];
                        this.answer = "";
                        console.log(result)
                        this.assessment = result.data.assessment;
                    })
                    .catch(error => {
                        this.error = error.data;
                    })
            }
        },
        watch: {
            timerCount: {
                handler(value) {
                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    } else {
                        window.location.href = '/assessment/1/complete';
                    }
                },
                immediate: true // This ensures the watcher is triggered upon creation
            }

        }
    }
</script>