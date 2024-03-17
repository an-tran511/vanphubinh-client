import { fetchClient } from '@/utils/fetchClient'

export const login = async (data: { email: string; password: string }) => {
  const response = await fetchClient.url('/auth/login').post(data).json<any>()
  return response
}

export const me = async () => {
  const response = await fetchClient.url('/auth/me').get().json<any>()
  return response
}

export const logout = async () => {
  const response = await fetchClient.url('/auth/logout').post().json()
  return response
}
