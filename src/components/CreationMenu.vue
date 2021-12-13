<template>
    <div class="background">
        <div class="project-menu">
            <div class="header">
                <span class="menu-name">
                    Создание проекта
                </span>
                <img src="@/assets/exit-btn.png" @click="$router.push('/main-page/project-view')"/>
            </div>
            <div class="new-project-form">
                <form>
                    <div class="form-line">
                        <span class="input-name">
                            Имя проекта
                        </span>
                        <input class="form-control" type="text" v-model="project_name" />
                    </div>
                    <div class="button-submit">
                        <input type="button" value="Создать" class="btn btn-primary" @click="createProject()"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            project_name: ""
        }
    },
    methods: {
        async createProject(){
            let url = "http://localhost:3000/projects/create-new-project"
            let token = this.getToken()

            let response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        project_name: this.project_name,
                        token: token
                    })
                })
            this.response = await response.json()

            if (this.response.status !== "succesful")
            {
                this.$router.push("/login")
                this.deleteSessionCookie()
            }
            else
            {
                this.$router.push("/main-page/project-view")
            }
        },
        getToken(){
            let allCookies = document.cookie.split(';')
            let jwt_token = allCookies.find(cookie => cookie.indexOf("blocknote_token=") != -1 )
            return jwt_token.replace("blocknote_token=", "")
        },
        deleteSessionCookie(){
            let cookies = document.cookie
            cookies = cookies.split(";")
            cookies.forEach(function(cookie, i, cookies){
                cookie = cookie + "; max-age=-1"
                document.cookie = cookie
                console.log(cookies)
            })
            this.$router.push("/login")
        }
    }
}
</script>

<style>

div.background{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.439);
    margin-top: -80px;
    z-index: 10;
}

div.project-menu{
    width: 800px;
    height: 450px;
    background: linear-gradient(-30deg,rgb(255, 229, 30), rgb(252, 149, 39));
    margin: 100px auto;
    border-radius: 10px;
    position: relative;
}

div.project-menu div.header{
    text-align: center;
    padding: 10px 10px;
    font-size: 2em;
    color: black;
    font-family: 'Open Sans', sans-serif;
    margin-bottom: 20px;
}

div.project-menu div.header img{
    width: 40px;
    padding:5px;
    float: right;
    cursor: pointer;
}

div.project-menu div.header img:hover{
    background-color: rgba(87, 87, 87, 0.542);
}

div.new-project-form div.form-line{
    margin: 5px 75px;
    line-height: 1.5em;
    text-align: left;
    padding: 5px 0;
}

div.new-project-form{
    height: 350px;
    padding: 0 50px;
}

div.new-project-form form{
    height: inherit;
}

div.new-project-form div.form-line span.input-name{
    display: inline-block;
    width: 200px;
    text-align: right;
    color: rgb(0, 0, 0);
    font-size: 1.5em;
    margin-right: 20px;
    line-height: 1.5em;
}

div.new-project-form div.form-line input{
    line-height: 1.5em;
    font-size: 1.2em;
    width: 300px;
    display: inline-block;
}

div.new-project-form div.form-line input:focus{
    border: 1px solid black;
}

div.new-project-form div.button-submit{
    position:absolute;
    width: 100px;
    bottom: 0;
    margin-bottom: 10px;
    text-align: right;
    width: 700px;
}

</style>
