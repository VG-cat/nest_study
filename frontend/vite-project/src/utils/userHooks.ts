import { useQuery } from '@apollo/client/react';
import { connectFactory, useAppContext } from './contextFactory';
import { GET_USER } from '@/graphql/user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useUserContext = () => useAppContext('userInfo');

export const connect = connectFactory('userInfo', {

});

export const useGetUser = () => {
    const { store, setStore } = useUserContext();
    const { data, loading, error } = useQuery(GET_USER);
    const nav = useNavigate();

    // 手动处理数据逻辑
    useEffect(() => {
        if (loading) return;
        if (error) {
            console.error("查询出错:", error);
            // 可以跳转登录页或提示错误
            return;
        }
        if (data?.getUserInfo) {
            setStore(data.getUserInfo); // 假设你有这个状态设置函数
            nav(`/`);  //已登录，无法访问再登录
        } else {
            // 如果没有获取到用户信息，跳转登录
            if(location.pathname.startsWith('/login')){
                nav(`/login?orgUrl=${window.location.pathname}`);
            }
        }
    }, [data, loading, error]);
}  