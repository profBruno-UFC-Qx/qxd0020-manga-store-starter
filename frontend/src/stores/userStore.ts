import { ref, computed } from 'vue'
import { defineStore } from "pinia"
import { type User } from "@/types"

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({} as User)

  const token = computed(() => user.value.jwt)

  function logout() {
    user.value = {} as User
  }

  return { user, token, logout }
})