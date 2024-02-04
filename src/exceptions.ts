export class ClientError extends Error {
  title: string;
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends ClientError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class ConflictError extends ClientError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class UnauthorizedError extends ClientError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ForbiddenError extends ClientError {
  constructor(message: string) {
    super(message, 403);
  }
}
