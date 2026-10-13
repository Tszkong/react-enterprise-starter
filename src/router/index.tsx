import BasicLayout from "@/layouts/BasicLayout";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import Users from "@/pages/users";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
    // 根路由：套布局组件
    {
        path: "/",
        element: <BasicLayout />,
        children: [
            // index: true 表示“父路径本身”，访问 / 时重定向到仪表盘
            {
                index: true,
                element: <Navigate to="/dashboard" replace />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "users",
                element: <Users />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />

    }
])

export default router;