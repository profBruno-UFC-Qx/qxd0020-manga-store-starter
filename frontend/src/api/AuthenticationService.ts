import { api } from "@/api"
import { type User } from '@/types'
import { useUserStore } from "@/stores/userStore"

class AuthenticationService {
  constructor() {}

  async login(identifier: string, password: string): Promise<User> {
    const { data } = await api.post('/auth/local', {
      identifier,
      password
    })

    const user: User = { ...data.user, jwt: data.jwt }
    user.role = await this.getRole(user)

    const userStore = useUserStore()
    userStore.user = user

    localStorage.setItem('role', user.role)
    localStorage.setItem('username', user.username)
    return user
  }

  private async getRole(user: User) {
    const { data } = await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${user.jwt}`
      },
      params: {
        populate: 'role'
      }
    })

    return data.role.type
  }
}

export const authenticationService = new AuthenticationService()