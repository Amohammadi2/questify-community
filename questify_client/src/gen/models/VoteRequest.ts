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
import type { VoteEnum } from './VoteEnum';
import {
    VoteEnumFromJSON,
    VoteEnumFromJSONTyped,
    VoteEnumToJSON,
} from './VoteEnum';

/**
 * 
 * @export
 * @interface VoteRequest
 */
export interface VoteRequest {
    /**
     * 
     * @type {VoteEnum}
     * @memberof VoteRequest
     */
    vote: VoteEnum;
}

/**
 * Check if a given object implements the VoteRequest interface.
 */
export function instanceOfVoteRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "vote" in value;

    return isInstance;
}

export function VoteRequestFromJSON(json: any): VoteRequest {
    return VoteRequestFromJSONTyped(json, false);
}

export function VoteRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): VoteRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'vote': VoteEnumFromJSON(json['vote']),
    };
}

export function VoteRequestToJSON(value?: VoteRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'vote': VoteEnumToJSON(value.vote),
    };
}

