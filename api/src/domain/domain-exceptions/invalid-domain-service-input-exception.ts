export class InvalidDomainServiceInputException extends Error {
    constructor(
        file: string,
        method: string,
        line: number,
        parameter: string,
        message: string
    ) {
        super(`${file}:${method}:${line} - ${parameter}: ${message}`);
        this.name = 'InvalidDomainServiceInputException';
    }
}
