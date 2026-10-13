import { useEffect, useState } from 'react'
import { useSettingsStore } from '@/stores/settings'

// 系统是否偏好暗色
function getSystemDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function useTheme() {
  const themeMode = useSettingsStore((s) => s.themeMode)
  const [systemDark, setSystemDark] = useState(getSystemDark)

  // 订阅系统主题变化：用户切换系统深浅色时，这里实时更新
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  // 最终是否暗色：显式 dark 或（system 且系统为暗）
  const isDark =
    themeMode === 'dark' || (themeMode === 'system' && systemDark)

  return { isDark, themeMode }
}
