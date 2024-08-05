

import { FastifyRequest, FastifyReply } from "fastify";
import { IHttpRequest } from "../ports/IHttp-request";
import { IHttpContext } from "../ports/IHttp-context";
import { IHttpResponse } from "../ports/IHttp-response";

export class FastifyAdapter<T> implements IHttpContext {

    req: FastifyRequest
    res: FastifyReply

    constructor(req: FastifyRequest, res: FastifyReply) {
        this.req = req;
        this.res = res
    }

    getRequest(): IHttpRequest {

        const resquest = {
            headers: this.req.raw.headers,
            body: this.req.body,
            params: this.req.params,
            query: this.req.query
        }

        return resquest
    }

    sendResponse(httpResponse: IHttpResponse<T>) {

        return this.res.status(httpResponse.statusCode).send(httpResponse.body)
    }
}