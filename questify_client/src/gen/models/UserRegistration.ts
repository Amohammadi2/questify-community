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
 * @interface UserRegistration
 */
export interface UserRegistration {
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     * @type {string}
     * @memberof UserRegistration
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof UserRegistration
     */
    password: string;
    /**
     * 
     * @type {string}
     * @memberof UserRegistration
     */
    email?: string;
}

/**
 * Check if a given object implements the UserRegistration interface.
 */
export function instanceOfUserRegistration(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "username" in value;
    isInstance = isInstance && "password" in value;

    return isInstance;
}

export function UserRegistrationFromJSON(json: any): UserRegistration {
    return UserRegistrationFromJSONTyped(json, false);
}

export function UserRegistrationFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRegistration {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'username': json['username'],
        'password': json['password'],
        'email': !exists(json, 'email') ? undefined : json['email'],
    };
}

export function UserRegistrationToJSON(value?: UserRegistration | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'username': value.username,
        'password': value.password,
        'email': value.email,
    };
}

