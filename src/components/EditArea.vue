<template>
    <div class="edit-area">
        <div class="textarea" id="textarea" @blur="saveBlockContent">
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "block_id"
    ],
    methods: {
        print(){
            console.log("adada")
            console.log(this.block_id)
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
        getToken(){
            let allCookies = document.cookie.split(';')
            let jwt_token = allCookies.find(cookie => cookie.indexOf("blocknote_token=") != -1 )
            return jwt_token.replace("blocknote_token=", "")
        },
        async getBlockContent(element){
            let url = "http://localhost:3000/projects/get-block-content"
            let token = this.getToken() 

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    token: token,
                    block_id: this.block_id
                })
            })
            this.response = await response.json()

            if (this.response.status !== "succesful")
            {
                this.deleteSessionCookie()
            }
            else
            {
                element.innerText = this.response.content
            }
        },
        async saveBlockContent(){
            let url = "http://localhost:3000/projects/save-block-content"
            let token = this.getToken()
            let element = document.getElementById("textarea")
            console.log(element.innerText)
            console.log(this.block_id)

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    token: token,
                    block_id: this.block_id,
                    content: element.innerText
                })
            })

            this.response = await response.json()

            if (this.response.status !== "succesful")
            {
                this.deleteSessionCookie()
            }
            else
            {
                alert("Текст блока успешно сохранен")
            }
        }
    },
    watch: {
        block_id: function(){
            let element = document.getElementById("textarea")
            if (this.block_id === 0)
            {
                element.contentEditable = false
                element.innerText = ""
            }
            else
            {
                element.contentEditable = true
                this.getBlockContent(element)
            }
        }
    }
}
</script>

<style>
div.edit-area{
    display:inline-block;
    width: 67%;
    min-height: 600px;
    background: linear-gradient(-30deg,rgb(255, 229, 30), rgb(252, 149, 39));
    margin: 20px 10px;
    border-radius: 10px 10px 0px 0px;
    padding: 50px 0px 0px 0px;
    border: 1px solid rgb(167, 171, 172);
}

div.textarea{
    width: 100%;
    min-height: 550px;
    height: 100%;
    background-color: white;
    padding: 5px 0px 0px 30px;
}

div.textarea:focus{
    outline: 0px solid transparent;
}

</style>
