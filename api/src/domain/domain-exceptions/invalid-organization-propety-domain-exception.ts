

export class InvalidOrganizationPropetyDomainException extends Error {
    
    constructor(file: string, line: number, property: string, message: string) {
        super(`Invalid organization property domain exception: ${file}:${line} - ${property}: ${message}`);
    }
}