import React from "react"
import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import HomePage from "../Pages/HomePage/HomePage"
import CardDetailPage from "../Pages/CardDetailPage/CardDetailPage"
import LoginPage from "../Pages/LoginPage/LoginPage"
import RegisterPage from "Pages/RegisterPage/RegisterPage"
import ForgotPasswordPage from "Pages/ForgotPasswordPage/ForgotPasswordPage"
import ResetPasswordPage from "Pages/ResetPasswordPage/ResetPasswordPage"
import MyApplicationPage from "Pages/MyApplicationPage/MyApplicationPage"
import CreatorPage from "Pages/CreatorPage/CreatorPage"

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {path:"",element:<HomePage/>},
            {path:"register-page",element:<RegisterPage/>},
            {path:"login-page",element:<LoginPage/>},
            {path:"forgot-password-page",element:<ForgotPasswordPage/>},
            {path:"reset-password-page/:email/:token",element:<ResetPasswordPage/>},
            {path:"my-application-page",element:<MyApplicationPage/>},
            {path:"card-detail-page/:offerId",element:<CardDetailPage/>},


            {path:"creator-page",element:<CreatorPage/>},
        ]
    }
])