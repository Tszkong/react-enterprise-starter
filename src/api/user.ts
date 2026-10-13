import type { User } from '@/types'

// ========== 本地 mock 数据（演示用：模拟后端分页） ==========
const mockUsers: User[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? '管理员' : '普通用户',
  status: i % 4 === 0 ? 'disabled' : 'active',
  createdAt: `2026-${String((i % 9) + 1).padStart(2, '0')}-1${i % 10}`,
}))

export function fetchUsers(params: { page: number; pageSize: number }) {
  // 模拟 500ms 网络延迟
  return new Promise<{ list: User[]; total: number }>((resolve) => {
    setTimeout(() => {
      const start = (params.page - 1) * params.pageSize
      resolve({
        list: mockUsers.slice(start, start + params.pageSize),
        total: mockUsers.length,
      })
    }, 500)
  })
}

// ========== 真实项目写法（后端就绪后，把上面整段换成下面这样） ==========
// import request from './request'
// export function fetchUsers(params: { page: number; pageSize: number }) {
//   return request.get('/users', { params }) as Promise<{ list: User[]; total: number }>
// }
