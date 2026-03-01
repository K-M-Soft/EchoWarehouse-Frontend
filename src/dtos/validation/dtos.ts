export class ErrorDetailDto {
  key: string;
  message: string;

  constructor(init?: Partial<ErrorDetailDto>) {
    this.key = init?.key || "";
    this.message = init?.message || "";
  }
}

export class BaseResponseDto {
  message: string;
  status?: number;
  details?: ErrorDetailDto[];

  constructor(init?: Partial<BaseResponseDto>) {
    this.message = init?.message || "";
    this.status = init?.status;
    this.details = init?.details?.map((d) => new ErrorDetailDto(d)) || [];
  }
}
