
import { RouterProvider } from 'react-router-dom';
import router from '@/router';
import { App as AntdApp, ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { useSettingsStore } from './stores/settings';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useTheme } from './hooks/useTheme';
import i18n from './i18n'

// antd 语言包映射（key 与 settings store 的 Locate 一致）
const antdLocales = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

function App() {
  const locale = useSettingsStore((s) => s.locale)
  const primaryColor = useSettingsStore((s) => s.primaryColor)
  const { isDark } = useTheme()

  // dayjs 语言包跟随语言切换（表格、日期组件的格式文案）
  useEffect(() => {
    dayjs.locale(locale === 'zh-CN' ? 'zh-cn' : 'en')
  }, [locale])

  // i18next 引擎跟随语言切换（关键联动：业务文案的切换靠它）
  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  // body 背景跟随主题，避免页面外围露白
  useEffect(() => {
    document.body.style.background = isDark ? '#141414' : '#f5f5f5'
  }, [isDark])

  return (
    <ConfigProvider
      locale={antdLocales[locale]}
      theme={{
        // 暗色用 darkAlgorithm，亮色用 defaultAlgorithm
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        // 主色：所有 antd 组件的主色一键跟随
        token: { colorPrimary: primaryColor }
      }}
    >
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
