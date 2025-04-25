export class ApiResponse {
  data: object | Array<object> | string | undefined;
  message: string;
  error: Error | null;
  constructor(
    data: object | Array<object> | string | undefined,
    message = "success",
    error: Error | null = null
  ) {
    this.data = data;
    this.message = message;
    this.error = (error as Error) || null;
  }
}

export class ApiError {
  message: string;
  error: Error | null;
  constructor(message: string, error: Error | null = null) {
    this.message = message;
    this.error = (error as Error) || null;
  }
}
