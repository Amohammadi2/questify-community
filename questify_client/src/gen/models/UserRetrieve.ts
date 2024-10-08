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
 * @interface UserRetrieve
 */
export interface UserRetrieve {
    /**
     * 
     * @type {number}
     * @memberof UserRetrieve
     */
    readonly id: number;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     * @type {string}
     * @memberof UserRetrieve
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof UserRetrieve
     */
    email?: string;
    /**
     * Designates whether the user can log into this admin site.
     * @type {boolean}
     * @memberof UserRetrieve
     */
    isStaff?: boolean;
}

/**
 * Check if a given object implements the UserRetrieve interface.
 */
export function instanceOfUserRetrieve(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "username" in value;

    return isInstance;
}

export function UserRetrieveFromJSON(json: any): UserRetrieve {
    return UserRetrieveFromJSONTyped(json, false);
}

export function UserRetrieveFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRetrieve {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'username': json['username'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'isStaff': !exists(json, 'is_staff') ? undefined : json['is_staff'],
    };
}

export function UserRetrieveToJSON(value?: UserRetrieve | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'username': value.username,
        'email': value.email,
        'is_staff': value.isStaff,
    };
}

