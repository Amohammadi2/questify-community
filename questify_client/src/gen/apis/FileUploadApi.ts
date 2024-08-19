/* tslint:disable */
/* eslint-disable */
/**
 * Questify
 * The ultimate question and answer platform
 *
 * The version of the OpenAPI document: 1.0.0-alpha
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  FileUploadResponse,
} from '../models';
import {
    FileUploadResponseFromJSON,
    FileUploadResponseToJSON,
} from '../models';

export interface FileUploadUploadCreateRequest {
    file?: Blob;
}

/**
 * 
 */
export class FileUploadApi extends runtime.BaseAPI {

    /**
     */
    async fileUploadUploadCreateRaw(requestParameters: FileUploadUploadCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<FileUploadResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.file !== undefined) {
            formParams.append('file', requestParameters.file as any);
        }

        const response = await this.request({
            path: `/file-upload/upload/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FileUploadResponseFromJSON(jsonValue));
    }

    /**
     */
    async fileUploadUploadCreate(requestParameters: FileUploadUploadCreateRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<FileUploadResponse> {
        const response = await this.fileUploadUploadCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}