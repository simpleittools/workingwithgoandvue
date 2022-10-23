import { createRouter, createWebHistory } from "vue-router";
import BodyComponent from "@/components/BodyComponent";
import Login from "@/components/Login";

const routes = [
    {
        path: "/",
        name: "Home",
        component: BodyComponent
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },

]

const router = createRouter({history: createWebHistory(), routes})
export default router