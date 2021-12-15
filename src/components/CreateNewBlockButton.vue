<template>
    <div class="new-block-button" @click="createBlock()">
        Создать новый блок
    </div>
</template>

<script>
export default {
    props:[
        "project_id"
    ],
    data(){
        return {
            new_block_data:{}
        }
    },
    methods:{
        async createBlock(){
            let url = "http://localhost:3000/projects/create-new-block"
            let token = this.getToken()

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    token: token,
                    project_id: this.project_id
                })
            })
            this.response = await response.json()

            if (this.response.status !== "succesful")
            {
                this.deleteSessionCookie()
            }
            else
            {
                this.new_block_data = this.response.block_headers
                this.$emit("addNewBlock", this.new_block_data)
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
div.new-block-button{
    background-color: rgb(43, 146, 255);
    border-radius: 10px;
    line-height: 50px;
    margin-top: 15px;
    margin-bottom: 5px;
    cursor: pointer;
}

div.new-block-button:hover{
    background-color: rgb(120, 185, 255);
}
</style>
