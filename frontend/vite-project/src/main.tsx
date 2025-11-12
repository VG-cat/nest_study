import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import styles from './theme.module.less'
import './index.css'
import App from './App.tsx'
import { ConfigProvider } from "antd-mobile";
import zhCN from 'antd-mobile/es/locales/zh-CN'
import { ApolloProvider } from '@apollo/client/react'
import { client } from '@/utils/apollo.ts'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { ROUTE_CONFIG } from '@/routes/index.ts'
import { NonePage } from '@/pages/404.tsx'
import UserInfo from '@/components/userInfo'
import Layout from '@/components/Layout/index.tsx'
import { config } from 'dotenv'


config();
console.log(process.env.PORT);

createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserInfo>
          <Routes>
            <Route path='/' element={<Layout />}>
              {ROUTE_CONFIG.map(item => (
                <Route path={item.path} element={<item.element />}>{item.name}</Route>
              ))}
            </Route>
            <Route path='*' element={<NonePage />}>404</Route>
          </Routes>
        </UserInfo>
      </BrowserRouter>

    </ApolloProvider>
  </ConfigProvider >,
)
