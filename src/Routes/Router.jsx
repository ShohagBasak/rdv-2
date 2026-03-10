import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import Features from "../pages/Features/Features";
import TeamData from "../pages/Staff/TeamData";
import Minecraft from "../pages/Minecraft/Minecraft";
import VoteRedirect from "../pages/Minecraft/VoteRedirect";
import Error from "../pages/Error/Error";
import MinecraftCalc from "../pages/Minecraft/MinecraftCalc";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        errorElement: <Error />, 
        children: [
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
            Component: Minecraft,
          },
          {
            path: 'minecraftBuildPlanner',
            Component: MinecraftCalc
          },
          {
            path: 'staff',
            Component: TeamData,
            loader: () => fetch('/dc.json')
          },
          {
            path: 'minecraft/:voteId',
            Component: VoteRedirect
          },
          { path: '*', element: <Error /> }
        ]
      }
    ]
  }
]);

