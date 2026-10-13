import { fetchUsers } from "@/api/user";
import type { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Button, Space, Table, Tag, type TableProps } from "antd";
import { useState } from "react";

export default function Users() {
    const [page, setPage] = useState(1);

    // TanStack Query：声明式数据请求
    // queryKey 变了（page 变）自动重新请求；数据自动缓存，切换页面不闪加载
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['users', page],
        queryFn: () => fetchUsers({ page, pageSize: 10 }),
    });

    const columns: TableProps<User>['columns'] = [
        { title: 'ID', dataIndex: 'id', width: 80 },
        { title: '用户名', dataIndex: 'name' },
        { title: '邮箱', dataIndex: 'email' },
        { title: '角色', dataIndex: 'role', render: (role: string) => <Tag color="blue">{role}</Tag> },
        { title: '状态', dataIndex: 'status', render: (status: User['status']) => status === 'active' ? <Tag color="green">启用</Tag> : <Tag color="red">禁用</Tag> },
        { 
            title: '操作',
            key: 'action',
            render: () => (
                <Space>
                    <Button type="link" size="small">编辑</Button>
                    <Button type="link" size="small" danger>删除</Button>
                </Space>
            )
        },
    ];

    if (isError) {
        return (
            <div>
                <h1>用户管理</h1>
                <p>加载失败，<Button type="link" onClick={() => refetch()}>点击重试</Button></p>
            </div>
        )
    }

    return (
        <div>
            <h1>用户管理</h1>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={data?.list ?? []}
                loading={isLoading}
                pagination={{
                    current: page,
                    pageSize: 10,
                    total: data?.total ?? 0,
                    onChange: (page) => setPage(page),
                }}
            />
        </div>
    )
}