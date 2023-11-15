import { ref } from 'vue'
import { defineStore } from "pinia"
import { type User } from "@/types"

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({} as User)

  function logout() {
    console.log("apagou!!!!")
    user.value = {} as User
  }

  return { user, logout }
})