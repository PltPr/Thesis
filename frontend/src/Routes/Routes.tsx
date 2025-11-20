import React from "react"
import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import HomePage from "../Pages/HomePage/HomePage"
import CardDetailPage from "../Pages/CardDetailPage/CardDetailPage"
import LoginPage from "../Pages/LoginPage/LoginPage"
import RegisterPage from "Pages/RegisterPage/RegisterPage"
import ForgotPasswordPage from "Pages/ForgotPasswordPage/ForgotPasswordPage"
import ResetPasswordPage from "Pages/ResetPasswordPage/ResetPasswordPage"
import MyApplicationPage from "Pages/MyApplicationPage/MyApplicationPage"
import CreatorPage from "Pages/AdminPage/CreatorPage/CreatorPage"
import AdminPage from "Pages/AdminPage/AdminPage"
import ApplicationPage from "Pages/AdminPage/ApplicationsPage/ApplicationPage"
import ClassificationPage from "Pages/AdminPage/ClassificationPage/ClassificationPage"
import TestInfoPage from "Pages/TestInfoPage/TestInfoPage"
import SolveTestPage from "Pages/SolveTestPage/SolveTestPage"
import JobOfferPage from "Pages/JobOfferPage/JobOfferPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "register-page", element: <RegisterPage /> },
            { path: "login-page", element: <LoginPage /> },
            { path: "forgot-password-page", element: <ForgotPasswordPage /> },
            { path: "reset-password-page/:email/:token", element: <ResetPasswordPage /> },
            { path: "my-application-page", element: <MyApplicationPage /> },
            { path: "job-offer-page", element: <JobOfferPage /> },
            { path: "card-detail-page/:offerId", element: <CardDetailPage /> },
            {path:"test-info-page/:appId/:testId",element:<TestInfoPage/>},
            {path:"solve-test-page/:appId/:testId",element:<SolveTestPage/>},
            {
                path: "admin-page",
                element: <AdminPage />,
                children:
                    [
                        { path: "creator-page", element: <CreatorPage /> },
                        { path: "application-page", element: <ApplicationPage /> },
                        { path: "classification-page", element: <ClassificationPage /> },

                    ]
            }
        ]


    }
])