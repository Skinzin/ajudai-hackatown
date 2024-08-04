 



export class InvalidItemPropertyDomainException extends Error {
    
    constructor(file: string, line: number, property: string, message: string) {
        super(`Invalid item property domain exception: ${file}:${line} - ${property}: ${message}`);
        this.name = "InvalidItemPropertyDomainException";
    }
}