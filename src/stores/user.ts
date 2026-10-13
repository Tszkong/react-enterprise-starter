import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    token: string | null;
    userInfo: { name: string } | null;
    login: (token: string, name: string) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>()(
    // persist 中间件：状态自动同步到 localStorage，刷新页面不丢
    persist(
        (set) => ({
            token: null,
            userInfo: null,
            login: (token, name) => set(() => ({ token, userInfo: { name } })),
            logout: () => set(() => ({ token: null, userInfo: null })),
        }),
        {
            name: "user-storage",
        }
    )
)