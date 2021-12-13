<template>
    <div class="bn-button">
        <img src="@/assets/pen.png" alt="" @click="$router.push('/main-page/project-view')"/>
    </div>
</template>

<script>
export default{
    
}
</script>

<style>

div.bn-button{
    position: fixed;
    width: 85px;
    background: linear-gradient(30deg, rgb(255, 17, 17), rgb(255, 32, 32));
    border-radius: 50px;
    border: 7px solid black;
    padding: 12px;
    margin-top: 75vh;
    margin-left: 20px;
    cursor: pointer;
    z-index: 1
}


div.bn-button img{
    width: 100%;
}
</style>