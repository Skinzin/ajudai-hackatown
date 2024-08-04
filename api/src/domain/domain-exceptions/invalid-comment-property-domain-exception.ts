

export class InvalidCommentPropertyDomainException extends Error {
    
    constructor(file: string, line: number, property: string, message: string) {
        super(`Invalid cpment property domain exception: ${file}:${line} - ${property}: ${message}`);
        this.name = "InvalidCommentPropertyDomainException";
    }
}