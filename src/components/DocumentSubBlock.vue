<template>
    <div class="document-sub-block" 
        draggable="true"
        @click="changeElememntActive"
        v-bind:class="{ active: block.active, not_active: !block.active }">
        <span class="sub-block-name" 
            v-bind:id="id"
            spellcheck="false" ondblclick="contentEditable=true; this.focus();" 
            @blur="updateBlockName" 
            onblur="this.contentEditable=false"
            onselectstart="return false">
            {{ block.block_name }}
        </span>
        <div class="delete-btn" v-if="block.active">
            <span @click="deleteBlock">
                &#10006;
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props:[
        "block"
    ],
    data(){
        return {
            id: {}
        }
    },
    mounted(){
        this.id = this.block.id
    },
    methods:{
        changeElememntActive(){
            this.block.active = true
            this.$emit("changeElementsActive", this.id)
            this.$emit("setContentInEditArea", this.id)
        },
        async updateBlockName(){
            let url = "http://localhost:3000/projects/update-block-name"
            let token = this.getToken() 
            let element = document.getElementById(String(this.id))

            if (element.textContent === "")
            {
                element.textContent = "Блок"
                alert("Название блока не может быть пустым")
            }

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    token: token,
                    block_id: this.id,
                    block_name: element.textContent
                })
            })
            this.response = await response.json()

            if (this.response.status !== "succesful")
            {
                this.deleteSessionCookie()
            }
            else
            {
                alert("Название блока успешно изменено")
            }
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
        async deleteBlock(){
            let url = "http://localhost:3000/projects/delete-block"
            let token = this.getToken() 

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    token: token,
                    block_id: this.id
                })
            })
            this.response = await response.json()

            if (this.response.status !== "succesful")
            {
                this.deleteSessionCookie()
            }
            else
            {
                this.$emit("removeBlock", this.id)
            }
        }
    }
}
</script>

<style>
div.document-sub-block{
    line-height: 50px;
    border-radius: 10px;
    min-height: 50px;
    text-align: center;
    margin: 5px 0px;
    color:black;
    cursor: pointer;
}

.active{
    background-color: rgb(0, 132, 255);
}

.not_active{
    background-color: rgb(211, 211, 211);
}

.not_active:hover{
    background-color: rgb(238, 238, 238);
}

div.delete-btn{
    width: 100%;
    text-align: center;
    font-size: 2em;
}

div.delete-btn span{
    padding: 10px 10px 0px 10px;
}

div.delete-btn span:hover{
    background-color: rgb(0, 53, 102);
    border-radius: 25px;

}
</style>