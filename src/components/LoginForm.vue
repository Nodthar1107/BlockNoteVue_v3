<template>
    <div>
        <div class="errors" v-if="error !== '' ">
            <span>
                {{this.error}}
            </span>
        </div>
        <div class="login-form">
            <span class="form-header">
                Вход
            </span>
            <form>
                <div class="reg-row">
                    <input type="text" placeholder="Имя пользователя" class="form-control" v-model="login">
                </div>
                <div class="reg-row">
                    <input type="password" placeholder="Пароль" class="form-control" v-model="password">
                </div>
                <div class="reg-row">
                    <input id="submit" type="button" value="Войти" class="btn btn-primary" @click="log_in()"> 
                </div>
                <div class="reg-link">
                    Нет аккаунта? <router-link to="/reg">Зарегистрируйтесь</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default{
    name: 'LoginForm',
    data(){
        return {
            error: "",
            login: "",
            password: "",
            response: {}
        }
    },
    methods: {
        async log_in(){
            let url = "http://localhost:3000/user/login"

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    login: this.login,
                    password: this.password,
                })
            })
            this.response = await response.json()

            if (this.response.status === "succesful")
            {
                document.cookie = "blocknote_token=" + this.response.token
                this.$router.push("/main-page")
            }
            else
            {
                this.error = this.response.message
            }
        }
    }
}
</script>

<style>
div.login-form{
    background-color: white;
    width: 300px;
    border-radius: 50px;
    padding: 20px;
    margin: 200px auto;
}

span.form-header{
    display:block;
    text-align: center;
    font-size: 2em;
    margin-top: 5px;
    margin-bottom: 15px;
}


div.login-form div.reg-row{
    margin-bottom: 20px;
    text-align: center;
}

div.login-form div.reg-row input{
    font-size: 1em;
    width: 200px;
    padding: 5px;
    margin: 0 auto;
}

div.login-form div.reg-row input#submit{
    width: 220px;
    background-color: black;
    border: 0;
}

div.login-form div.reg-row input#submit:hover{
    color: rgb(186, 186, 186);
}

div.login-form div.reg-link{
    margin-top: -10px;
    text-align: center;
    font-size: 0.8em;
}

div.login-form a{
    text-decoration: none;
}
</style>