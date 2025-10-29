import { NonePage } from "../pages/404";
import Login from "../pages/login";

export const ROUTE_CONFIG = [
    {
        path:'/login',
        title:'登录',
        element:Login,
    },
    {
        path:'/404',
        title:'404',
        element:NonePage,
    }
]