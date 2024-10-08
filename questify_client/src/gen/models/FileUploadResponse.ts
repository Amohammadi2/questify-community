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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface FileUploadResponse
 */
export interface FileUploadResponse {
    /**
     * 
     * @type {string}
     * @memberof FileUploadResponse
     */
    fileUrl: string;
}

/**
 * Check if a given object implements the FileUploadResponse interface.
 */
export function instanceOfFileUploadResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "fileUrl" in value;

    return isInstance;
}

export function FileUploadResponseFromJSON(json: any): FileUploadResponse {
    return FileUploadResponseFromJSONTyped(json, false);
}

export function FileUploadResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): FileUploadResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'fileUrl': json['file_url'],
    };
}

export function FileUploadResponseToJSON(value?: FileUploadResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'file_url': value.fileUrl,
    };
}

