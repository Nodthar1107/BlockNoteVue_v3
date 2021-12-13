<template>
    <div class="project-menu-element">
        <span class="element-number">
            {{ Number(index) + 1 }}
        </span>
        <span class="project-name" @click="openProject()">
            {{ project.name }}
        </span>
        <span class="delete-btn">
            <img src="@/assets/exit-btn.png" @click="deleteProject()" />
        </span>
    </div>
</template>

<script>
export default {
    props: ["project", "index"],
    data(){
        return {
            id: {},
            response: {}
        }
    },
    mounted(){
        this.id = this.project.id
    },
    methods:{
        async deleteProject(){
            let url = "http://localhost:3000/projects/delete-project"
            let token = this.getToken()

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    token: token,
                    id: this.id
                })
            })
            this.response = await response.json()

            if (this.response.status !== "succesful")
            {
                this.deleteSessionCookie
                this.$router.push("/login")
            }
            else
            {
                this.$emit("deleteProject", this.id)
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
        },
        openProject(){
            this.$router.push("/main-page/project-editing/" + this.id)
        }
    }
}
</script>

<style>
div.project-menu-element{
    margin: 5px 20px;
    background-color: white;
    border-radius: 5px;
    height: 60px;
    line-height: 60px;
    text-align: left;
    padding: 0px 10px;
    font-size: 0.7em;
}

div.project-menu-element span.project-name:hover{
    text-decoration: underline;
    cursor: pointer;
}

div.project-menu-element span.delete-btn{
    float: right;
    width: 30px;
    height: 30px;
    display: block;
}

div.project-menu-element span.delete-btn img{
    padding: 5px;
}

div.project-menu-element span.delete-btn:hover img{
    background-color: rgba(0, 0, 0, 0.296);
}

div.project-menu-element span.delete-btn img{
    width: 100%;
}

</style>