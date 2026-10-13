import type { Translation } from './zh-CN'

// 用 Translation 类型约束：英文词典必须和中文结构完全一致，缺 key 直接编译报错
const enUS: Translation = {
  app: {
    name: 'Admin Pro',
  },
  menu: {
    dashboard: 'Dashboard',
    users: 'Users',
  },
  header: {
    preferences: 'Preferences',
    logout: 'Logout',
    unlogged: 'Not logged in',
  },
  dashboard: {
    title: 'Dashboard',
    desc: 'Home page content, to be filled with antd cards and charts.',
  },
  users: {
    title: 'Users',
    loadFailed: 'Failed to load',
    retry: 'Click to retry',
    deleteSuccess: 'Deleted successfully',
    saveSuccess: 'Saved successfully',
    confirmDelete: 'Confirm Delete',
    confirmDeleteContent: 'Delete user "{{name}}"? This cannot be undone.',
    edit: 'Edit',
    delete: 'Delete',
    name: 'Name',
    email: 'Email',
    role: 'Role',
    status: 'Status',
    enabled: 'Enabled',
    disabled: 'Disabled',
    pleaseEnterName: 'Please enter name',
    pleaseEnterEmail: 'Please enter email',
    admin: 'Admin',
    normalUser: 'Normal user',
    editUser: 'Edit User',
  },
  notFound: {
    title: '404',
    subTitle: 'Sorry, the page you visited does not exist.',
    backHome: 'Back to Home',
  },
  preferences: {
    title: 'Preferences',
    theme: 'Theme',
    themeMode: 'Theme Mode',
    light: 'Light',
    dark: 'Dark',
    followSystem: 'Follow System',
    primaryColor: 'Primary Color',
    darkSidebar: 'Dark Sidebar',
    language: 'Language',
  },
}

export default enUS
