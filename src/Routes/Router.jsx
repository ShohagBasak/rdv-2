import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import Features from "../pages/Features/Features";
import TeamData from "../pages/Staff/TeamData";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children:[
            {
                index: true,
                Component: Home,
                loader: () => fetch('/dc.json')
            },
            {
                path: 'feature',
                Component: Features
            },
            {
                path: '/Staff',
                Component: TeamData,
                loader: () => fetch('/dc.json')
            }
        ]
    }
])