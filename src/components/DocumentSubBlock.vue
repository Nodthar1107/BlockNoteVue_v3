<template>
    <div class="document-sub-block">
        <span class="sub-block-name">
            {{ block.block_name }}
        </span>
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
    }
}
</script>

<style>
div.document-sub-block{
    background-color: rgb(223, 223, 223);
    line-height: 50px;
    border-radius: 10px;
    min-height: 50px;
    text-align: center;
    margin: 5px 0px;
}
/*
div.document-block:hover{
    background-color: rgb(255, 255, 255);
    cursor: pointer;
}*/
</style>