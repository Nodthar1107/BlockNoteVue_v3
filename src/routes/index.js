import VueRouter from "vue-router"


import RegForm from "@/components/RegForm.vue"
import LoginForm from "@/components/LoginForm.vue"
import MainPage from "@/pages/MainPage.vue"
import BlockNoteButton from "@/components/BlockNoteButton.vue"
import ProjectMenu from "@/components/ProjectMenu.vue"
import CreationMenu from "@/components/CreationMenu.vue"
import ProjectEditing from "@/pages/ProjectEditingPage.vue"

export default new VueRouter({
    mode: "history",
    routes: [{
            path: "/reg",
            component: RegForm
        },
        {
            path: "/login",
            component: LoginForm
        },
        {
            path: "/main-page",
            component: MainPage,
            children: [{
                    path: "",
                    component: BlockNoteButton
                },
                {
                    path: "project-view",
                    component: ProjectMenu
                },
                {
                    path: "create-project",
                    component: CreationMenu
                },
                {
                    path: "project-editing/:id",
                    component: ProjectEditing
                }
            ]
        }
    ]
})