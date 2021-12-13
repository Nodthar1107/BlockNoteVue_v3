<template>
    <div class="background">
        <div class="project-menu">
            <div class="header">
                <span class="menu-name">
                    Просмотр проектов
                </span>
                <img src="@/assets/exit-btn.png" @click="$router.push('/main-page')" />
            </div>
            <div class="projects">
                <div v-if="empty === ''">
                    <ProjectMenuElement 
                        v-for="(project, index) of projects"
                        v-bind:project="project"
                        v-bind:index="index"
                        :key="project.id"
                        @deleteProject="deleteProject"
                    />
                </div>
                <div class="empty-message" v-else>
                    {{ empty }}
                </div>
            </div>
            <div class="buttons">
                <span class="create-project-btn" @click="$router.push('/main-page/create-project')">
                    Создать новый проект
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectMenuElement from "@/components/ProjectMenuElement"

export default{
    components: {
        ProjectMenuElement
    },
    data(){
        return {
            projects: [],
            empty: "Проекты отсутствуют",
            response: {}
        }
    },
    async mounted(){
        let url = "http://localhost:3000/projects/get-all-projects-info"
        let token = this.getToken()
        let response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                       token: token
                    })
                })
        this.response = await response.json()
        
        if (this.response.projects.length === 0){
            this.empty = "Проекты отсутствуют"
        }
        else
        {
            this.projects = this.response.projects
            this.empty = ""
        }

    },
    methods: {
        getToken(){
            let allCookies = document.cookie.split(';')
            let jwt_token = allCookies.find(cookie => cookie.indexOf("blocknote_token=") != -1 )
            return jwt_token.replace("blocknote_token=", "")
        },
        deleteProject(id){
            this.projects = this.projects.filter(project => project.id !== id)
            if (this.projects.length === 0)
            {
                this.empty = "Проекты отсутствуют"
            }
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

div.project-menu div.projects{
    margin: 10px 50px;
    min-height: 80px;
    max-height: 290px;
    line-height: 80px;
    font-size: 2em;
    overflow-y: scroll;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 10px 0px;
}

div.project-menu div.projects div.empty-message{
    color: black;
    text-align: center;
}

div.project-menu div.buttons{
    height: 50px;
    position: absolute;
    z-index: 10;
    width: 20px;
    bottom: 0;
    width: 100%;
    padding: 0px 50px;
    margin-bottom: 10px;
}

div.project-menu div.buttons span.create-project-btn{
    text-align: center;
    background-color: white;
    line-height: 50px;
    display: block;
    font-size: 1.6em;
    font-family: 'Open Sans', sans-serif;
    border-radius: 10px;
    cursor: pointer;
}

div.project-menu div.buttons span.create-project-btn:hover{
    background-color: rgb(118, 189, 255);
}

</style>
