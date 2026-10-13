import type { ReactNode } from 'react'
import { Drawer, Segmented, Switch, theme } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { COLOR_PRESETS, useSettingsStore } from '@/stores/settings'
import type { ThemeMode, Locale } from '@/stores/settings'

interface Props {
  open: boolean
  onClose: () => void
}

export default function PreferencesDrawer({ open, onClose }: Props) {
  const { t } = useTranslation()
  // 当前主题的 token：用来给选中的色圆画边框
  const { token } = theme.useToken()

  // 读 store：每个字段一个订阅（只订阅用到的，避免多余重渲染）
  const themeMode = useSettingsStore((s) => s.themeMode)
  const primaryColor = useSettingsStore((s) => s.primaryColor)
  const darkSidebar = useSettingsStore((s) => s.darkSidebar)
  const locale = useSettingsStore((s) => s.locale)
  const setThemeMode = useSettingsStore((s) => s.setThemeMode)
  const setPrimaryColor = useSettingsStore((s) => s.setPrimaryColor)
  const setDarkSidebar = useSettingsStore((s) => s.setDarkSidebar)
  const setLocale = useSettingsStore((s) => s.setLocale)

  return (
    <Drawer title={t('preferences.title')} open={open} onClose={onClose} width={320}>
      {/* 主题模式 */}
      <SectionTitle>{t('preferences.themeMode')}</SectionTitle>
      <Segmented
        block
        value={themeMode}
        onChange={(v) => setThemeMode(v as ThemeMode)}
        options={[
          { label: t('preferences.light'), value: 'light' },
          { label: t('preferences.dark'), value: 'dark' },
          { label: t('preferences.followSystem'), value: 'system' },
        ]}
      />

      {/* 主题色 */}
      <SectionTitle>{t('preferences.primaryColor')}</SectionTitle>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {COLOR_PRESETS.map((color) => {
          const selected = color.value === primaryColor
          return (
            <button
              key={color.value}
              title={color.name}
              onClick={() => setPrimaryColor(color.value)}
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: color.value,
                border: selected ? `2px solid ${token.colorText}` : 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              {selected && <CheckOutlined style={{ fontSize: 12 }} />}
            </button>
          )
        })}
      </div>

      {/* 深色侧边栏 */}
      <SectionTitle>{t('preferences.darkSidebar')}</SectionTitle>
      <Switch checked={darkSidebar} onChange={setDarkSidebar} />

      {/* 语言 */}
      <SectionTitle>{t('preferences.language')}</SectionTitle>
      <Segmented
        block
        value={locale}
        onChange={(v) => setLocale(v as Locale)}
        options={[
          { label: '中文', value: 'zh-CN' },
          { label: 'English', value: 'en-US' },
        ]}
      />
    </Drawer>
  )
}

// 区块标题小组件
function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontSize: 14, fontWeight: 600, margin: '16px 0 8px' }}>
      {children}
    </div>
  )
}
