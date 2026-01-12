import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import Features from "../pages/Features/Features";
import StaffData from "../pages/Staff/StaffData";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: 'feature',
                Component: Features
            },
            {
                path: 'Staff',
                Component: StaffData,
                loader: () => fetch('/dc.json')
            }
        ]
    }
])