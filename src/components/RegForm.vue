<template>
    <div>
        <div class="errors" v-if="error !== '' ">
            <span>
                {{this.error}}
            </span>
        </div>
        <div class="reg-form">
            <span class="form-header">
                Регистрация
            </span>
            <form>
                <div class="reg-row">
                    <input type="text" placeholder="Имя пользователя" class="form-control" v-model="login">
                </div>
                <div class="reg-row">
                    <input type="text" placeholder="Почта" class="form-control" v-model="mail">
                </div>
                <div class="reg-row">
                    <input type="text" placeholder="Номер телефона" class="form-control" v-model="phone_number">
                </div>
                <div class="reg-row">
                    <input type="password" placeholder="Пароль" class="form-control" autocomplete="new-password" v-model="password">
                </div>
                <div class="reg-row">
                    <input type="password" placeholder="Подтверждение пароля" class="form-control" autocomplete="new-password" v-model="confirm_password"> 
                </div>
                <div class="reg-row">
                    <input id="submit" type="button" value="Зарегистрироваться" class="btn btn-primary" @click="send"> 
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default{
    data(){
        return {
           response: {},
           login: "",
           password: "",
           phone_number: "",
           confirm_password: "",
           mail: "",
           error: ""
        }
    },

    methods:{
        password_correct(){
            if ((this.password === "") || (this.password !== this.confirm_password))
            {
                return false
            }
            return true
        },
        login_correct(){
            let result
            this.login === "" ? result = false : result = true
            return result
        },
        mail_correct(){
            let result
            this.mail === "" ? result = false : result = true
            return result
        },
        phone_number_correct(){
            let result
            this.phone_number === "" ? result = false : result = true
            return result
        },
        async send(){
            this.error = ""
            this.password_correct() ? this.error : this.error = "Пароли не совпадают или Пароль не заполнен"
            this.login_correct() ? this.error : this.error = "Поле Логин не заполнено"
            this.phone_number_correct() ? this.error : this.error = "Поле Телефон не заполнено"
            this.mail_correct() ? this.error : this.error = "Поле Почта не заполнено"

            let url = "http://localhost:3000/user/create-user"

            if (this.error === "")
            {
                
                let response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        login: this.login,
                        password: this.password,
                        mail: this.mail,
                        telephone: this.phone_number
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
}
</script>

<style>
div.reg-form{
    background-color: white;
    width: 350px;
    border-radius: 50px;
    padding: 20px;
    margin: 100px auto 0px auto;
}

span.form-header{
    display:block;
    text-align: center;
    font-size: 2em;
    margin-top: 5px;
    margin-bottom: 15px;
}


div.reg-form div.reg-row{
    margin-bottom: 20px;
    text-align: center;
}

div.reg-form div.reg-row input{
    font-size: 1em;
    width: 250px;
    padding: 5px;
    margin: 0 auto;
}

div.reg-form div.reg-row input#submit{
    width: 260px;
    background-color: black;
    border: 0;
    color: rgb(186, 186, 186);
}

div.reg-form div.reg-row input#submit:hover{
    color: rgb(255, 255, 255);
}

div.errors{
    background-color: red;
    width: 600px;
    height: fit-content;
    line-height: 25px;
    padding: 30px 40px;
    font-size: 1.2em;
    border-radius: 20px;
    text-align: center;
    color: white;
    margin: 100px auto -90px auto;
    text-align: left;
}
</style>