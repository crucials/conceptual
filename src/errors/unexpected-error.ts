export class UnexpectedError extends Error {
    constructor(message?: string) {
        if (message) {
            super(`unexpected error occurred: ${message}`)
        } else {
            super('unexpected error occurred')
        }
    }
}
