<template>
    <div class="nav-panel">
        <div class="logo nav-el" @click="$router.push('/main-page')">
            <span>
                BlockNote
            </span>
        </div>
        <div class="btn-container nav-el">
            <div class="nav-btn"> 
                <span class="btn"> 
                    Новости
                </span>
            </div>
            <div class="nav-btn"> 
                <span class="btn">
                    Популярные авторы
                </span>
            </div>
            <div class="nav-btn"> 
                <span class="btn">
                    Торговая площадка
                </span>
            </div>
        </div>
        <div class="profile nav-el">
            <div class="content">
                <div class="img prof-el">
                </div>
                <div class="user-name prof-el" title="Нажмите, чтобы выйти">
                    <span @click="deleteSessionCookie()">
                        {{ login }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    props: [
        'login'
    ],
    methods: {
        async deleteSessionCookie(){
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

div.nav-panel{
    width:100%;
    height:80px;
    background: linear-gradient(30deg,rgb(255, 229, 30), rgb(252, 149, 39));
    margin-top: 0px;
    text-align: left;
}

div.nav-el{
    display: inline-block;
    height: 80px;
    line-height: 60px;
    margin: 0px 10px;
    padding: 10px 0px;
    float: left;
}

div.logo{
    font-family: 'Dancing Script', cursive;
    font-size: 3em;
    color: black;
    cursor: pointer;
    width: 12vw;
}

div.logo:hover{
    color: rgb(247, 247, 247);
}

div.btn-container{
    width: 60vw;
    text-align: center;
}

div.btn-container div.nav-btn{
    width: fit-content;
    display: inline-block;
    text-align: center;
    margin: 0px 10px;
}

div.btn-container div.nav-btn span.btn{
    font-family: 'Dancing Script', cursive;
    color: black;
    font-style: italic;
    font-size: 1.5em;
}

div.btn-container div.nav-btn span.btn:hover{
    background-color: rgb(216, 178, 26);
    border-radius: 10px;
}

div.profile{
    width: 20vw;

}

div.profile div.content{
    width: fit-content;
    margin: 0 auto;
}

div.profile div.content div.prof-el{
    display: inline-block;
    margin: 0px 5px;
}

div.profile div.content div.img{
    width: 60px;
    height: 60px;
    background-color: rgb(255, 255, 255);
    border-radius: 60px;
    border: 4px solid black;
    float: left;
}

div.profile div.content div.user-name{
    line-height:60px;
    color:black;
    cursor: pointer;
}

div.profile div.content div.user-name:hover{
    color: rgb(255, 255, 255);
}

</style>
