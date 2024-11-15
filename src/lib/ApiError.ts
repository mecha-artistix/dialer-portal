// src/types/ApiError.ts
export class ApiError extends Error {
  status: number;
  details?: T;

  constructor(message: string, status: number, details?: T) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}
