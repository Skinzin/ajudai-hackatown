

export class CommentNotFoundApplicationException extends Error {


    constructor(fileName: string, lineNumber: number, message: string) {
        super(`Erro no arquivo ${fileName} na linha ${lineNumber}: ${message}`)

        this.name = 'CommentNotFoundApplicationException'
    }
}
