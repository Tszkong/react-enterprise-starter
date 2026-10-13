import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  DashboardOutlined,
  LogoutOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores/user'
import { useSettingsStore } from '@/stores/settings'
import PreferencesDrawer from '@/components/PreferencesDrawer'

const { Header, Sider, Content } = Layout

export default function BasicLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo, logout } = useUserStore()
  const darkSidebar = useSettingsStore((s) => s.darkSidebar)
  const { t } = useTranslation()
  const { token } = theme.useToken() // 当前主题的语义 token
  const [prefsOpen, setPrefsOpen] = useState(false)

  // 菜单移入组件内：label 用 t()，语言切换时菜单文字才会跟着变
  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: t('menu.dashboard'),
    },
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: t('menu.users'),
    },
  ]

  const siderTheme = darkSidebar ? 'dark' : 'light'

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 侧边栏：明暗跟随偏好设置 */}
      <Sider theme={siderTheme} width={220}>
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: darkSidebar ? '#fff' : token.colorText,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {t('app.name')}
        </div>
        <Menu
          theme={siderTheme}
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      {/* 右侧：顶栏 + 内容区 */}
      <Layout>
        <Header
          style={{
            background: token.colorBgContainer, // 跟随主题的容器背景色
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingInline: 24,
          }}
        >
          <span style={{ marginRight: 12 }}>
            <UserOutlined /> {userInfo?.name ?? t('header.unlogged')}
          </span>
          <Button
            type="text"
            icon={<SettingOutlined />}
            onClick={() => setPrefsOpen(true)}
          >
            {t('header.preferences')}
          </Button>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={() => {
              logout()
              navigate('/dashboard')
            }}
          >
            {t('header.logout')}
          </Button>
        </Header>
        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
      </Layout>

      {/* 偏好设置抽屉 */}
      <PreferencesDrawer open={prefsOpen} onClose={() => setPrefsOpen(false)} />
    </Layout>
  )
}
