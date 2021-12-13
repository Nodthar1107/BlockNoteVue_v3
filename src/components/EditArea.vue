<template>
    <div class="edit-area">
        <div class="textarea" contenteditable="true">
        </div>
    </div>
</template>

<script>
export default {
    
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
