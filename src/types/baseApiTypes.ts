export type ApiError = {
  message: string
  status?: number
  details?: any
}

export type ApiResponse<T = unknown> = {
  data: T
  message: string
  isOk: boolean
}

