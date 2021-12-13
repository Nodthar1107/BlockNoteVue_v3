<template>
    <div v-bind:class="{ black: expanded, document_block: !expanded }" >
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
    background-color: rgb(0, 0, 0);
    line-height: 50px;
    border-radius: 10px;
    min-height: 50px;
    text-align: center;
    padding: 5px;
    font-size: 1.2em;
    color: white;
}

div span.block-name{
    display: block;
    cursor: pointer;
}

div.black span.block-name:hover{
    border-radius: 10px;
    background-color: rgb(65, 65, 65);
}
</style>
