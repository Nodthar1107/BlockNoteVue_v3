<template>
    <div class="tg-button" @click="makeTxtFile">
        <img src="@/assets/paper.png" alt="" />
    </div>
</template>

<script>
export default{
    props: [
        "project_id"
    ],
    methods:{
        async makeTxtFile(){
            let url = "http://localhost:3000/projects/get-text-file"
            let token = this.getToken()
            console.log(this.project_id)

            if (this.project_id === 0)
            {
                return
            }

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    token: token,
                    project_id: this.project_id
                })
            })
            this.response = await response.json()

            if (this.response.status !== "succesful")
                this.deleteSessionCookie()
            else
            {
                console.log(this.response.content)
                let blob = new Blob([this.response.content], { type: "text/pali"})
                let url2 = URL.createObjectURL(blob)
                const anchor = document.createElement('a');
                anchor.href = url2;
                anchor.download = this.response.file_name;

                // Append to the DOM
                document.body.appendChild(anchor);

                // Trigger `click` event
                anchor.click();

                // Remove element from DOM
                document.body.removeChild(anchor);
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
        }
    }
}
</script>

<style>

div.tg-button{
    position: fixed;
    width: 85px;
    bottom: 0;
    right: 0;
    margin-right: 20px;
    margin-bottom: 20px;
    background: linear-gradient(30deg, rgb(255, 17, 17), rgb(255, 32, 32));
    border-radius: 50px;
    border: 7px solid black;
    cursor: pointer;
    z-index: 2;
    padding: 10px;
}

div.tg-button:hover{
    background: linear-gradient(30deg, rgb(253, 55, 55), rgb(255, 64, 64));
}

div.tg-button img{
    width: 100%;
}
</style>