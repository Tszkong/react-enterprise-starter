# React 企业级项目骨架

基于 **React 19 + TypeScript + Vite 8** 的企业级中后台项目骨架，内置路由、状态管理、数据请求、UI 组件库等完整技术栈，可直接作为新项目起点。

## 技术栈

| 分类 | 选型 | 版本 |
|---|---|---|
| 框架 | React | 19.x |
| 构建 | Vite | 8.x |
| 语言 | TypeScript | 6.x |
| 路由 | React Router | 7.x |
| 状态管理 | Zustand | 5.x |
| 服务端状态 | TanStack Query | 5.x |
| UI 组件 | Ant Design | 6.x |
| HTTP | Axios | 1.x |
| 表单 | React Hook Form | 7.x |
| 日期 | Day.js | 1.x |

## 目录结构

```
src/
├── api/          # axios 封装（request.ts）+ 接口定义
├── components/   # 通用业务组件
├── hooks/        # 自定义 Hooks
├── layouts/      # 布局组件（BasicLayout：侧边栏 + 顶栏 + 内容区）
├── pages/        # 页面（按功能模块分目录）
│   ├── dashboard/
│   ├── users/
│   └── not-found/
├── router/       # 路由配置（createBrowserRouter 数据路由）
├── stores/       # Zustand 全局状态（user.ts）
├── types/        # 全局 TS 类型
└── utils/        # 工具函数
```

## 快速开始

```bash
pnpm install      # 安装依赖
pnpm dev          # 启动开发服务器（默认 http://localhost:5173）
pnpm build        # 类型检查 + 生产构建
pnpm preview      # 预览生产构建
pnpm lint         # 代码检查
```

## 环境变量

| 文件 | 用途 |
|---|---|
| `.env.development` | 开发环境配置，提交 Git |
| `.env.production` | 生产环境配置，提交 Git |
| `.env.local` | 本地私有配置（如密钥），**不提交 Git** |

变量说明：
- `VITE_API_BASE_URL` — 后端接口基础地址，axios 实例从这里读取

## 接入真实后端

当前 `src/api/user.ts` 使用本地 mock 数据。后端就绪后：

1. 将 `fetchUsers` 函数体替换为 `request.get('/users', { params })`（文件内已附注释示例）
2. 按后端实际返回结构调整 `src/types/index.ts` 中的 `ApiResponse` 约定
3. 修改 `.env.development` 中的 `VITE_API_BASE_URL` 指向联调环境

## 核心约定

- **服务端数据**用 TanStack Query（`useQuery`），禁止在 `useEffect` 里手写请求
- **客户端全局状态**用 Zustand store，页面局部状态用 `useState`
- 接口统一走 `src/api/request.ts`，不直接 `import axios from 'axios'`
- 路径引用统一用 `@/` 别名（指向 `src/`）
- 组件默认函数组件 + Hooks，不写类组件
