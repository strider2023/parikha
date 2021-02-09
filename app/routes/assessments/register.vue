<template>
    <div class="container">
        <div class="text-center"> 
            <h1 class="display-1 mt-5">Parīkṣā</h1>
            <p class="lead mb-5">Assessment Portal</p>
        </div>
        <div class="shadow-lg p-3 mb-5 bg-dark text-white rounded">
            <h1 class="display-4" data-bs-toggle="collapse" href="#collapseInstruction" role="button" aria-expanded="false" aria-controls="collapseInstruction">Read before you begin,</h1>
            <ul class="list-unstyled collapse" id="collapseInstruction">
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Integer molestie lorem at massa</li>
                <li>Facilisis in pretium nisl aliquet</li>
                <li>Nulla volutpat aliquam velit
                    <ul>
                        <li>Phasellus iaculis neque</li>
                        <li>Purus sodales ultricies</li>
                        <li>Vestibulum laoreet porttitor sem</li>
                        <li>Ac tristique libero volutpat at</li>
                    </ul>
                </li>
                <li>Faucibus porta lacus fringilla vel</li>
                <li>Aenean sit amet erat nunc</li>
                <li>Eget porttitor lorem</li>
            </ul>
        </div>
        <div class="shadow-lg p-3 mb-5 bg-white text-black rounded">
            <h1 class="display-4" data-bs-toggle="collapse" href="#collapseLogin" role="button" aria-expanded="false" aria-controls="collapseLogin">Proceed</h1>
            <form class="collapse" id="collapseLogin" v-on:submit.prevent="sendData">
                <div class="form-floating mb-3">
                    <input id="email" class="form-control" type="email" placeholder="name@example.com" v-model="email" autocomplete="email" required>
                    <label for="email" class="form-label">Email</label>
                    <div id="emailHelp" class="form-text">Enter your registered email id.</div>
                </div>
                <div class="form-floating mb-3">
                    <input id="assessmentCode" class="form-control" type="text" v-model="assessmentCode" required/>
                    <label for="assessmentCode" class="form-label">Assessment Code</label>
                    <div id="assessmentCodeHelp" class="form-text">Enter the assessment code you recieved in the registered email.</div>
                </div>
                <input type="submit" class="btn btn-primary"/>
            </form>
        </div>
        
        <!-- <h3>Result:</h3>
        <pre>{{result}}</pre> -->
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                email: "",
                assessmentCode: "",
                result: {},
                error: ""
            }
        },
        methods: {
            sendData: function() {
                const data = {
                    email: this.email,
                    assessmentCode: this.assessmentCode,
                }
                axios.post("/assessment/start", data)
                    .then(result => {
                        // this.result = result.data;
                        // console.log(result);
                        window.location.replace(`/assessment/${result.data._id}`);
                    })
                    .catch(error => {
                        this.error = error.data;
                        Notiflix.Notify.Failure(error.response.data.message);
                    })
            }
        }
    }
</script>