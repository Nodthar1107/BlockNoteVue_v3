<template>
    <div>
        <DocumentHierarchy
            v-on:setContentInEditArea="setContentInEditArea"
            v-on:setProjectId="setProjectId"
            v-on:removeBlock="removeBlock"
            v-on:blockEditArea="blockEditArea"
        />
        <EditArea
            v-bind:block_id="active_block_id"
        />
        <FileButton
            v-bind:project_id="project_id"
        />
    </div>
</template>

<script>
import DocumentHierarchy from "@/components/DocumentHierarchy.vue"
import EditArea from "@/components/EditArea.vue"
//import EditTools from "@/components/EditTools.vue"
import FileButton from "@/components/TextFileGenButton"

export default{
    components: {
        DocumentHierarchy,
        EditArea,
        FileButton
        //EditTools
    },
    data(){
        return {
            active_block_id: 0,
            project_id: 0
        }
    },
    methods:{
        setContentInEditArea(block_id){
            this.active_block_id = block_id
        },
        setProjectId(project_id){
            this.project_id = project_id
        },
        removeBlock(){
            this.active_block_id = 0
        },
        blockEditArea(){
            this.active_block_id = 0
        }
    }
}
</script>

