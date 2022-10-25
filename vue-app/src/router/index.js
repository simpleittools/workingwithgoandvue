import { createRouter, createWebHistory } from "vue-router";
import BodyComponent from "@/components/BodyComponent";
import Login from "@/components/Login";
import Books from "@/components/Books";
import Book from "@/components/Book";
import BookEdit from "@/components/BookEdit";
import BooksAdmin from "@/components/BooksAdmin";
import Users from "@/components/Users";
import UserEdit from "@/UserEdit";

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
    {
        path: "/books",
        name: "Books",
        component: Books
    },
    {
        path: "/books/:bookName",
        name: "Book",
        component: Book
    },
    {
        path: "/admin/books",
        name: "BooksAdmin",
        component: BooksAdmin
    },
    {
        path: "/admin/books/:bookId",
        name: "BookEdit",
        component: BookEdit
    },
    {
        path: "/admin/users",
        name: "Users",
        component: Users
    },
    {
        path: "/admin/users/:userId",
        name: "UserEdit",
        component: UserEdit
    },

]

const router = createRouter({history: createWebHistory(), routes})
export default router