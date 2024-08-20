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
 * @interface AcceptAnswerRequest
 */
export interface AcceptAnswerRequest {
    /**
     * 
     * @type {boolean}
     * @memberof AcceptAnswerRequest
     */
    accepted?: boolean;
}

/**
 * Check if a given object implements the AcceptAnswerRequest interface.
 */
export function instanceOfAcceptAnswerRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AcceptAnswerRequestFromJSON(json: any): AcceptAnswerRequest {
    return AcceptAnswerRequestFromJSONTyped(json, false);
}

export function AcceptAnswerRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AcceptAnswerRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'accepted': !exists(json, 'accepted') ? undefined : json['accepted'],
    };
}

export function AcceptAnswerRequestToJSON(value?: AcceptAnswerRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'accepted': value.accepted,
    };
}

