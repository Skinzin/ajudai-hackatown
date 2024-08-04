export class InvalidPublicationPropertyDomainException extends Error {
    
    constructor(file: string, line: number, property: string, message: string) {
        super(`Invalid publication property domain exception: ${file}:${line} - ${property}: ${message}`);
    }
}