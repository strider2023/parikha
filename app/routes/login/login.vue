<template>
    <div class="container">
        <div class="text-center">
            <h1 class="display-1 mt-5 mr-5 ml-5">{{message}}</h1>
            <p class="lead mb-5">Admin Login</p>
        </div>
        <form class="shadow-lg p-3 mb-5 bg-white rounded col" v-on:submit.prevent="sendData">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input id="email" class="form-control" type="email" name="email" v-model="email" autocomplete="email" required/>
                <div id="emailHelp" class="form-text">Enter your registered email id.</div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input id="password" class="form-control" type="password" name="password" v-model="password" autocomplete="current-password" required/>
            </div>
            <input type="submit" class="btn btn-primary"/>
        </form>
        <!-- <h3>Result:</h3>
        <pre>{{result}}</pre> -->
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                message: "",
                result: {},
                error: ""
            }
        },
        methods: {
            sendData: function() {
                const data = {
                    email: this.email,
                    password: this.password,
                }
                axios.post("/admin/login", data)
                    .then(result => {
                        // this.result = result.data;
                        console.log('called');
                        window.location.href = "/admin/dashboard";
                    })
                    .catch(error => {
                        this.error = error.data;
                    })
            }
        }
    }
</script>