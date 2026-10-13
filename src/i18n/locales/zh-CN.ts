const zhCN = {
    app: {
      name: 'Admin Pro',
    },
    menu: {
      dashboard: '仪表盘',
      users: '用户管理',
    },
    header: {
      preferences: '偏好设置',
      logout: '退出',
      unlogged: '未登录',
    },
    dashboard: {
      title: '仪表盘',
      desc: '这里是首页内容，后续用 antd 卡片、图表填充。',
    },
    users: {
      title: '用户管理',
      loadFailed: '加载失败',
      retry: '点击重试',
      deleteSuccess: '删除成功',
      saveSuccess: '保存成功',
      confirmDelete: '确认删除',
      confirmDeleteContent: '确定删除用户「{{name}}」吗？删除后不可恢复。',
      edit: '编辑',
      delete: '删除',
      name: '姓名',
      email: '邮箱',
      role: '角色',
      status: '状态',
      enabled: '启用',
      disabled: '禁用',
      pleaseEnterName: '请输入姓名',
      pleaseEnterEmail: '请输入邮箱',
      admin: '管理员',
      normalUser: '普通用户',
      editUser: '编辑用户',
    },
    notFound: {
      title: '404',
      subTitle: '抱歉，你访问的页面不存在。',
      backHome: '返回首页',
    },
    preferences: {
      title: '偏好设置',
      theme: '主题',
      themeMode: '主题模式',
      light: '浅色',
      dark: '深色',
      followSystem: '跟随系统',
      primaryColor: '主题色',
      darkSidebar: '深色侧边栏',
      language: '语言',
    },
  }
  
  export default zhCN
  
  // 导出类型：供其他语言词典做结构校验
  export type Translation = typeof zhCN
  