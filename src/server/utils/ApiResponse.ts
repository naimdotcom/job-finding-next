export class ApiResponse {
  data: any;
  message: string;
  error: any;
  constructor(data: any, message: string = "success", error: any = null) {
    this.data = data;
    this.message = error.message;
    this.error = error;
  }
}

export class ApiError {
  message: string;
  error: any;
  constructor(message: string, error: any = null) {
    this.message = message;
    this.error = error;
  }
}
