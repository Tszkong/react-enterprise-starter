import axios from "axios";

// 创建 axios 实例：统一 baseURL 和超时时间
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 15000,
});

// 请求拦截器：统一给每个请求加 token
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
)

// 响应拦截器：统一处理后端返回和错误
instance.interceptors.response.use(
    (response) => {
        // 后端约定返回 { code, data, message }，code 0 表示成功
        const res = response.data;
        if (res.code !== 0) {
            return Promise.reject(new Error(res.message || '请求失败'));
        }
        return res.data;
    },
    (error) => {
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    // token 失效：清掉本地登录态
                    localStorage.removeItem('token');
            }
        }
        return Promise.reject(error);
    }
)

export default instance;