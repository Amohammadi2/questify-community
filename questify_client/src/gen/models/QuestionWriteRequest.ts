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
 * @interface QuestionWriteRequest
 */
export interface QuestionWriteRequest {
    /**
     * 
     * @type {string}
     * @memberof QuestionWriteRequest
     */
    htmlContent: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionWriteRequest
     */
    title: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof QuestionWriteRequest
     */
    tags: Array<string>;
}

/**
 * Check if a given object implements the QuestionWriteRequest interface.
 */
export function instanceOfQuestionWriteRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "htmlContent" in value;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "tags" in value;

    return isInstance;
}

export function QuestionWriteRequestFromJSON(json: any): QuestionWriteRequest {
    return QuestionWriteRequestFromJSONTyped(json, false);
}

export function QuestionWriteRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): QuestionWriteRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'htmlContent': json['html_content'],
        'title': json['title'],
        'tags': json['tags'],
    };
}

export function QuestionWriteRequestToJSON(value?: QuestionWriteRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'html_content': value.htmlContent,
        'title': value.title,
        'tags': value.tags,
    };
}

