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
 * @interface Author
 */
export interface Author {
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     * @type {string}
     * @memberof Author
     */
    username: string;
    /**
     * 
     * @type {number}
     * @memberof Author
     */
    readonly id: number;
}

/**
 * Check if a given object implements the Author interface.
 */
export function instanceOfAuthor(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "username" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function AuthorFromJSON(json: any): Author {
    return AuthorFromJSONTyped(json, false);
}

export function AuthorFromJSONTyped(json: any, ignoreDiscriminator: boolean): Author {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'username': json['username'],
        'id': json['id'],
    };
}

export function AuthorToJSON(value?: Author | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'username': value.username,
    };
}

