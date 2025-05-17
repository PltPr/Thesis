import React from "react"
import {createBrowserRouter} from "react-router-dom"
import App from "../App.tsx"
import HomePage from "../Pages/HomePage/HomePage.tsx"
import CardDetailPage from "../Pages/CardDetailPage/CardDetailPage.tsx"
import LoginPage from "../Pages/LoginPage/LoginPage.tsx"

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {path:"",element:<HomePage/>},
            {path:"login-page",element:<LoginPage/>},
            {path:"card-detail-page/:offerId",element:<CardDetailPage/>}

        ]
    }
])