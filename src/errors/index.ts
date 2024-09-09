export class AppError extends Error {
    constructor(explanation: string, readonly statusCode = 500) {
        super(explanation)
    }
}

export class UnexpectedError extends AppError {
    constructor(message?: string) {
        if (message) {
            super(`unexpected error occurred: ${message}`)
        } else {
            super('unexpected error occurred')
        }
    }
}
