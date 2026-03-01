import { ErrorDetailDto } from "../dtos/validation/dtos"

export type ApiError = {
  message: string
  status?: number
  details?: ErrorDetailDto[]
}

export type ApiResponse<T = unknown> = {
  data: T
  message: string
  isOk: boolean
}

