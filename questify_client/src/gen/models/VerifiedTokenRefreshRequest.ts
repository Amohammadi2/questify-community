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
 * Inherit from `TokenRefreshSerializer` and touch the database
before re-issuing a new access token and ensure that the user
exists and is active.
 * @export
 * @interface VerifiedTokenRefreshRequest
 */
export interface VerifiedTokenRefreshRequest {
    /**
     * 
     * @type {string}
     * @memberof VerifiedTokenRefreshRequest
     */
    refresh: string;
}

/**
 * Check if a given object implements the VerifiedTokenRefreshRequest interface.
 */
export function instanceOfVerifiedTokenRefreshRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "refresh" in value;

    return isInstance;
}

export function VerifiedTokenRefreshRequestFromJSON(json: any): VerifiedTokenRefreshRequest {
    return VerifiedTokenRefreshRequestFromJSONTyped(json, false);
}

export function VerifiedTokenRefreshRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): VerifiedTokenRefreshRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'refresh': json['refresh'],
    };
}

export function VerifiedTokenRefreshRequestToJSON(value?: VerifiedTokenRefreshRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'refresh': value.refresh,
    };
}

