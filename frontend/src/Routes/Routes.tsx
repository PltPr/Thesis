import React from "react"
import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import HomePage from "../Pages/HomePage/HomePage"
import CardDetailPage from "../Pages/CardDetailPage/CardDetailPage"
import LoginPage from "../Pages/LoginPage/LoginPage"
import RegisterPage from "Pages/RegisterPage/RegisterPage"
import ForgotPasswordPage from "Pages/ForgotPasswordPage/ForgotPasswordPage"
import ResetPasswordPage from "Pages/ResetPasswordPage/ResetPasswordPage"

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

            {path:"card-detail-page/:offerId",element:<CardDetailPage/>}
        ]
    }
])