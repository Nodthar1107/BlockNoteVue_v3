<template>
    <div>
        <NavPanel
            v-bind:login="user_name"
        />
        <router-view></router-view>       
    </div>
</template>

<script>
import NavPanel from "@/components/NavPanel.vue"

export default{
    components: {
        NavPanel
    },
    data(){
        return {
            user_name: "",
            response: {}
        }
    },
    async mounted(){
        let token = this.getToken()

        let url = "http://localhost:3000/user/get-user-data"
        let response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                       token: token
                    })
                })
        this.response = await response.json()

        if (this.response.status !== "succesful")
        {
            this.$router.push("/login")
            this.deleteSessionCookie()
        }
        else
        {
            this.user_name = this.response.login
        }
    },
    methods: {
        getToken(){
            let allCookies = document.cookie.split(';')
            let jwt_token = allCookies.find(cookie => cookie.indexOf("blocknote_token=") != -1 )
            return jwt_token.replace("blocknote_token=", "")
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
        }
    }
}

</script>
