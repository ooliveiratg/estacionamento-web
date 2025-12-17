import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UsernameZustand = {
  username: string | null;
  token: string | null;
  setToken: (token: string | null) => void;
  setUsername: (name: string | null) => void;
  fetchUser: () => Promise<void>;
};

export const useAuthStore = create<UsernameZustand>()(
  persist(
    (set, get) => ({
      username: null,
      token: null,

      setToken: (token) => set({ token }),
      setUsername: (name) => set({ username: name }),

      fetchUser: async () => {
        const token = get().token;
        if (!token) {
          console.log("Token não encontrado");
          return;
        }

        try {
          const res = await fetch(
            "https://parking-api-9rj9.onrender.com/auth/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await res.json();
          set({ username: data.nome });
        } catch (error) {
          console.error("Erro ao buscar usuário:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
