<template>
    <div class="container-fluid">
        <div class="row m-5">
            <div class="text-center col-12"> 
                <h1 class="display-1 mt-5">Parīkṣā</h1>
                <p class="lead mt-5">You have successfully completed your assessment. Your result will be mailed to your registered mail id.</p>
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
        }
    }
</script>