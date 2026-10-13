import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import './index.css'
import App from './App.tsx'

// dayjs 切中文
dayjs.locale('zh-cn');

// 全局 React Query 配置：统一控制请求重试、缓存时间等
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 默认失败重试 1 次
      staleTime: 1000 * 60 * 5, // 5分钟内数据视为“新鲜”，不重复请求
      refetchOnWindowFocus: false, // 窗口聚焦时不重新请求（后台系统一般关掉）
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* React Query：接管所有接口数据 */}
    <QueryClientProvider client={queryClient}>
      {/* antd 中文语言包 */}
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
)
