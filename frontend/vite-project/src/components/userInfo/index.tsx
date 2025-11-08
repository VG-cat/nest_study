import { connect, useGetUser, useUserContext } from '@/utils/userHooks';
import React,{useState,useEffect, Children} from 'react';

/**
 * 用户信息组件
 * @returns 
 */
const UserInfo = ({children}:{children:React.ReactNode}) => {
    useGetUser();

    return children;
};

const HOCUserInfo = connect(UserInfo)
export default HOCUserInfo; 