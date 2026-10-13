// 统一响应结构
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 用户实体
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'disabled';
  createdAt: string;
}