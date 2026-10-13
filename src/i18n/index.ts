import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

// 资源表：语言 key 与 settings store 的 Locale 保持一致
const resources = {
  'zh-CN': { translation: zhCN },
  'en-US': { translation: enUS },
} as const

i18n.use(initReactI18next).init({
  resources,
  lng: 'zh-CN',        // 默认语言
  fallbackLng: 'zh-CN', // 找不到 key 时回退中文
  interpolation: {
    escapeValue: false, // React 本身会转义，不需要 i18next 再转义
  },
})

// ===== 类型安全：让 t('xxx') 的 key 有提示、写错会报错 =====
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: (typeof resources)['zh-CN']
  }
}

export default i18n
