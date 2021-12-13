<template>
    <div class="doc-hierarchy">
        <span class="header">
            Структура проекта
        </span>
        <div class="blocks-container">
            <DocumentBlock
                v-bind:project_name="response.project_name"
                v-bind:id="response.project_id"
                v-bind:blocks="this.response.blocks_headers"
            />
        </div>
    </div>
</template>

<script>
import DocumentBlock from "@/components/DocumentBlock.vue"

export default {
    components:{
        DocumentBlock
    },
    data(){
        return {
            project_name: "",
            project_struct: {},
            response: {},
            id: {}
        }
    },
    async mounted(){
        let url = "http://localhost:3000/projects/get-project-struct"
        let token = this.getToken()

        let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    token: token,
                    id: this.$router.history.current.params.id
                })
            })
            this.response = await response.json()

            if (this.response.status !== "succesful")
            {
                this.deleteSessionCookie()
                this.$router.push("/login")
            }
            else
            {
                this.project_name = this.response.project_name
                this.project_struct = this.response.blocks_headers
                this.id = this.response.project_id
            }
    },
    methods: {
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

div.doc-hierarchy{
    display: inline-block;
    width: 20%;
    min-width: 250px;
    min-height: 600px;
    margin: 20px 20px 0px 20px;
    background: linear-gradient(30deg,rgb(255, 229, 30), rgb(252, 149, 39));
    border-radius: 10px;
    box-shadow: -10px 10px rgba(0, 0, 0, 0.748);
    padding: 5px;
    box-sizing: border-box;
    float: left;
}

div.doc-hierarchy span.header{
    display: block;
    margin: 10px 5px;
    font-stretch:ultra-condensed;
    text-align: center;
    font-size: 1.6em;
    color: black;
}

</style>