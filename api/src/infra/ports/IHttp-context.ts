import { IHttpRequest } from "./IHttp-request";
import { IHttpResponse } from "./IHttp-response";

export interface IHttpContext {
    getRequest: () => IHttpRequest;
    sendResponse: (httpResponse: IHttpResponse<any>) => any
}