export class InvalidReplyPropertyDomainException extends Error {
    constructor(file: string, line: number, property: string, message: string) {
        super(`Invalid property [${property}] at ${file}:${line} - ${message}`);
        this.name = "InvalidReplyPropertyDomainException";
    }
}
