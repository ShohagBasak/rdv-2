import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import Features from "../pages/Features/Features";
import TeamData from "../pages/Staff/TeamData";
import Minecraft from "../pages/Minecraft/Minecraft";
import VoteRedirect from "../pages/Minecraft/VoteRedirect";

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
                path: 'minecraft',
                Component: Minecraft
            },
            {
                path: '/staff',
                Component: TeamData,
                loader: () => fetch('/dc.json')
            },
            {
                path: '/vote/:id',
                Component: VoteRedirect
            }
        ]
    }
])