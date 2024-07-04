// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import 'antd/dist/reset.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'


// for date-picker i18n
import 'dayjs/locale/zh-cn';
import LogOut from './pages/logOut.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path='/login' element={<LogOut />} />
        <Route path='*' element={<App />} />
      </Routes>
    </ConfigProvider>
  </Router>


)
