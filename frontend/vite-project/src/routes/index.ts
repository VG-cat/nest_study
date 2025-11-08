import { NonePage } from "../pages/404";
import Login from "../pages/login";

export const ROUTE_CONFIG = [
    {
        path:'/login',
        name:'登录',
        element:Login,
    },
    {
        path:'/404',
        name:'404',
        element:NonePage,
    }
]