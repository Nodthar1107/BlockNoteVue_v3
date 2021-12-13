<template>
    <div class="document-block">
        <span class="block-name" @click="expanded = !expanded">
            {{ project_name }}
        </span>
        <div class="blocks" v-if="expanded === true">
            <DocumentSubBlock
                v-for="block in blocks"
                v-bind:block="block"
                :key="block.id"
            />
            <CreateNewBlockButton/>
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
    }
}
</script>

<style>
div.document-block{
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

div.document-block:hover{
    background-color: black;
    color: white;
    cursor: pointer;
}

</style>
