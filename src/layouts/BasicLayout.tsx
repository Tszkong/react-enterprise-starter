import { useUserStore } from "@/stores/user";
import { DashboardOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

// 菜单配置
const menuItems = [
    {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: '仪表盘'
    },
    {
        key: '/users',
        icon: <TeamOutlined />,
        label: '用户管理'
    }
]

export default function BasicLayout() {
    const navigate = useNavigate()
    const location = useLocation()
    const { userInfo, logout } = useUserStore()

    return(
        <Layout style={{ minHeight: '100vh' }}>
            {/* 左侧边栏 */}
            <Sider theme="dark" width={220}>
                <div style={{
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 600,
                }}>
                    Admin Pro
                </div>
                <Menu
                    theme="dark"
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
                        background: "#fff",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        paddingInline: 24
                    }}
                >
                    <span style={{ marginRight: 12 }}>
                        <UserOutlined /> {userInfo?.name ?? '未登录'}
                    </span>
                    <Button 
                        type="text"
                        icon={<LogoutOutlined />} 
                        onClick={() => {
                            logout();
                            navigate('/dashboard');
                        }}
                    >
                        退出
                    </Button>
                </Header>
                <Content style={{ margin: 16 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}