import React from "react"
import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import HomePage from "../Pages/HomePage/HomePage"
import CardDetailPage from "../Pages/CardDetailPage/CardDetailPage"
import LoginPage from "../Pages/LoginPage/LoginPage"
import RegisterPage from "Pages/RegisterPage/RegisterPage"

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {path:"",element:<HomePage/>},
            {path:"register-page",element:<RegisterPage/>},
            {path:"login-page",element:<LoginPage/>},
            {path:"card-detail-page/:offerId",element:<CardDetailPage/>}

        ]
    }
])