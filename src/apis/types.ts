export type ListResponse<T> = {
  data: T[]
  meta: {
    total: number
    currentPage: number
    lastPage: number
  }
}

export type AuthResponse = {
  success: boolean
  user: {
    email: string
    username: string
  }
}
