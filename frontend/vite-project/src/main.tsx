import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import styles from './theme.module.less'
import './index.css'
import App from './App.tsx'
import { ConfigProvider } from "antd-mobile";
import zhCN from 'antd-mobile/es/locales/zh-CN'
import { ApolloProvider } from '@apollo/client/react'
import { client } from './utils/apollo.ts'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { ROUTE_CONFIG } from './routes/index.ts'
import { NonePage } from './pages/404.tsx'

createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Routes>
        {ROUTE_CONFIG.map(item => (
          <Route path={item.path} element={<item.element/>}>{item.title}</Route>
        ))}
        <Route path='*' element={<NonePage/>}>404</Route>
      </Routes>
     
      </BrowserRouter>     
    </ApolloProvider>
  </ConfigProvider>,
)
