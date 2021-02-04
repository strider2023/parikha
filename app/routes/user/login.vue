<template>
    <div class="container">
        <div class="text-center">
            <h1 class="display-1 mt-5 mr-5 ml-5">Parīkṣā</h1>
            <p class="lead mb-5">Admin Login</p>
        </div>
        <form class="shadow-lg p-3 mb-5 bg-white rounded col" v-on:submit.prevent="sendData">
            <div class="form-floating mb-3">
                <input id="email" class="form-control" type="email" v-model="email" autocomplete="email" required/>
                <label for="email" class="form-label">Email</label>
                <div id="emailHelp" class="form-text">Enter your registered email id.</div>
            </div>
            <div class="form-floating mb-3">
                <input id="password" class="form-control" type="password" v-model="password" autocomplete="current-password" minlength="8" required/>
                <label for="password" class="form-label">Password</label>
            </div>
            <input type="submit" class="btn btn-primary"/>
            <a class="btn btn-warning" href="/admin/register" role="button">Register</a>
        </form>
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
                        window.location.replace('/admin/dashboard');
                    })
                    .catch(error => {
                        console.error(error.response.data);
                        Notiflix.Notify.Failure(error.response.data.message);
                    })
            }
        }
    }
</script>