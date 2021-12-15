<template>
    <div v-bind:class="{ black: expanded, document_block: !expanded }">
        <div class="block-name" @click="expanded = !expanded; disactivateElementsActive(); blockEditArea()">
            <span spellcheck="false" ondblclick="contentEditable=true; this.focus();" 
                @blur="updateProjectName()" 
                onblur="this.contentEditable=false"
                id="project"
                onselectstart="return false">
                {{ project_name }}
            </span>
        </div>
        <div class="blocks" v-if="expanded === true" draggable="true">
            <DocumentSubBlock
                v-for="block in blocks"
                v-bind:block="block"
                :key="block.id"
                v-on:changeElementsActive="changeElementsActive"
                v-on:setContentInEditArea="setContentInEditArea"
                v-on:removeBlock="removeBlock"
            />
            <CreateNewBlockButton
                v-bind:project_id="id"
                v-on:addNewBlock="addNewBlock"
            />
        </div>
    </div>
</template>

<script>
import DocumentSubBlock from "@/components/DocumentSubBlock.vue"
import CreateNewBlockButton from "@/components/CreateNewBlockButton.vue"

export default {
    props: [
        "project_name",
        "id",
        "blocks"
    ],
    components: {
        DocumentSubBlock,
        CreateNewBlockButton
    },
    data(){
        return {
            expanded: false
        }
    },
    methods:{
        addNewBlock(block_data){
            this.blocks.push(block_data)
            this.expanded = true
        },
        async updateProjectName(){
            let url = "http://localhost:3000/projects/update-project-name"
            let token = this.getToken() 
            let element = document.getElementById("project")

            if (element.textContent === "")
            {
                element.textContent = "Проект"
                alert("Название проекта не может быть пустым")
                return
            }

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    token: token,
                    project_id: this.id,
                    project_name: element.textContent
                })
            })
            this.response = await response.json()

            if (this.response.status !== "succesful")
            {
                this.deleteSessionCookie()
            }
            else
            {
                alert("Название проекто успешно изменено")
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
        changeElementsActive(id){
            let blocks = this.blocks
            blocks.forEach(function(block, i, blocks){
                console.log(blocks)
                if (block.id !== id)
                {
                    block.active = false
                }
            })
        },
        disactivateElementsActive(){
            let blocks = this.blocks
            blocks.forEach(function(block, i, blocks){
                console.log(blocks)
                block.active = false
            })
        },
        setContentInEditArea(block_id){
            this.$emit("setContentInEditArea", block_id)
        },
        removeBlock(block_id){
            this.blocks = this.blocks.filter(block => block.id !== block_id)
            this.$emit("removeBlock")
        },
        blockEditArea(){
            this.$emit("blockEditArea")
        }
    }
}
</script>

<style>
.document_block{
    width:100%;
    background-color: rgb(255, 255, 255);
    line-height: 50px;
    border-radius: 10px;
    min-height: 50px;
    text-align: center;
    padding: 5px;
    font-size: 1.2em;
    color: black;
}

.document_block:hover{
    background-color: black;
    color: white;
}

.black{
    background-color: black;
    width:100%;
    line-height: 50px;
    border-radius: 10px;
    min-height: 50px;
    text-align: center;
    padding: 5px;
    font-size: 1.2em;
    color: white;
}

.black div.block-name{
    margin-bottom:15px;
    white-space: normal;
    text-decoration: none;
    cursor: pointer;
    min-height: 50px;
}

div.block-name{
    cursor:pointer
}

div.black div.block-name:hover{
    border-radius: 10px;
    background-color: rgb(65, 65, 65);
}

[contenteditable]:focus {
    outline: 0px solid transparent;
}
</style>
