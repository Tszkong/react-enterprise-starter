import { deleteUser, fetchUsers, updateUser } from "@/api/user";
import type { User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App, Button, Form, Input, Modal, Select, Space, Table, Tag, type TableProps } from "antd";
import { useState } from "react";

export default function Users() {
    const [page, setPage] = useState(1);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    // 从 antd App context 拿 message / modal
    const { message, modal } = App.useApp()

    // TanStack Query：声明式数据请求
    // queryKey 变了（page 变）自动重新请求；数据自动缓存，切换页面不闪加载
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['users', page],
        queryFn: () => fetchUsers({ page, pageSize: 10 }),
    });

    // ===== 删除（写）：useMutation =====
    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteUser(id),
        onSuccess: () => {
            // 让 ['users'] 相关缓存全部失效并重新请求，列表自动刷新
            queryClient.invalidateQueries({ queryKey: ['users'] })
            message.success('删除成功')
        }
    })

    // ===== 编辑（写）：useMutation =====
    const editMutation = useMutation({
        mutationFn: ({ id, data }: { id: number, data: Partial<User> }) => updateUser(id, data),
        onSuccess: () => {
            setEditingUser(null)
            queryClient.invalidateQueries({ queryKey: ['users'] })
            message.success('保存成功')
        }
    })

    const handleEdit = (user: User) => {
        setEditingUser(user)
        form.setFieldsValue(user)
    }

    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (editingUser) {
                editMutation.mutate({ id: editingUser.id, data: values })
            }
        })
    }

    const columns: TableProps<User>['columns'] = [
        { title: 'ID', dataIndex: 'id', width: 80 },
        { title: '用户名', dataIndex: 'name' },
        { title: '邮箱', dataIndex: 'email' },
        { title: '角色', dataIndex: 'role', render: (role: string) => <Tag color="blue">{role}</Tag> },
        { title: '状态', dataIndex: 'status', render: (status: User['status']) => status === 'active' ? <Tag color="green">启用</Tag> : <Tag color="red">禁用</Tag> },
        { 
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button type="link" size="small" onClick={() => handleEdit(record)}>编辑</Button>
                    <Button 
                        type="link" 
                        size="small" 
                        danger
                        loading={deleteMutation.isPending}
                        onClick={() => {
                            modal.confirm({
                                title: '确定删除',
                                content: `确认删除用户「${record.name}」吗？删除后不可恢复。`,
                                onOk: () => deleteMutation.mutate(record.id)
                            })
                        }}
                    >删除</Button>
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

            {/* 编辑弹窗 */}
            <Modal
                title="编辑用户"
                open={!!editingUser}
                onOk={handleSubmit}
                confirmLoading={editMutation.isPending}
                onCancel={() => setEditingUser(null)}
            >
                <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="姓名"
                    rules={[{ required: true, message: '请输入姓名' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[{ required: true, message: '请输入邮箱' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="role" label="角色">
                    <Select
                    options={[
                        { value: '管理员', label: '管理员' },
                        { value: '普通用户', label: '普通用户' },
                    ]}
                    />
                </Form.Item>
                <Form.Item name="status" label="状态">
                    <Select
                    options={[
                        { value: 'active', label: '启用' },
                        { value: 'disabled', label: '禁用' },
                    ]}
                    />
                </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}