import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark' | 'system'
export type Locale = 'zh-CN' | 'en-US'

// 内置主题色预设
export const COLOR_PRESETS = [
  { name: '默认', value: '#1677ff' },
  { name: '紫罗兰', value: '#722ed1' },
  { name: '樱花粉', value: '#eb2f96' },
  { name: '柠檬黄', value: '#faad14' },
  { name: '天蓝色', value: '#13c2c2' },
  { name: '浅绿色', value: '#52c41a' },
  { name: '锌色灰', value: '#8c8c8c' },
  { name: '深绿色', value: '#a0d911' },
  { name: '深蓝色', value: '#2f54eb' },
]

interface SettingsState {
  themeMode: ThemeMode
  primaryColor: string
  darkSidebar: boolean
  locale: Locale
  setThemeMode: (mode: ThemeMode) => void
  setPrimaryColor: (color: string) => void
  setDarkSidebar: (value: boolean) => void
  setLocale: (locale: Locale) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      themeMode: 'light',
      primaryColor: '#1677ff',
      darkSidebar: true,
      locale: 'zh-CN',
      setThemeMode: (themeMode) => set({ themeMode }),
      setPrimaryColor: (primaryColor) => set({ primaryColor }),
      setDarkSidebar: (darkSidebar) => set({ darkSidebar }),
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'app-settings', // localStorage key（和 user store 的 user-storage 区分开）
    },
  ),
)
