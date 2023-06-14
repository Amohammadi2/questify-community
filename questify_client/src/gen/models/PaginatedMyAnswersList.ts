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
import type { MyAnswers } from './MyAnswers';
import {
    MyAnswersFromJSON,
    MyAnswersFromJSONTyped,
    MyAnswersToJSON,
} from './MyAnswers';

/**
 * 
 * @export
 * @interface PaginatedMyAnswersList
 */
export interface PaginatedMyAnswersList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedMyAnswersList
     */
    count?: number;
    /**
     * 
     * @type {string}
     * @memberof PaginatedMyAnswersList
     */
    next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PaginatedMyAnswersList
     */
    previous?: string | null;
    /**
     * 
     * @type {Array<MyAnswers>}
     * @memberof PaginatedMyAnswersList
     */
    results?: Array<MyAnswers>;
}

/**
 * Check if a given object implements the PaginatedMyAnswersList interface.
 */
export function instanceOfPaginatedMyAnswersList(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaginatedMyAnswersListFromJSON(json: any): PaginatedMyAnswersList {
    return PaginatedMyAnswersListFromJSONTyped(json, false);
}

export function PaginatedMyAnswersListFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedMyAnswersList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'next': !exists(json, 'next') ? undefined : json['next'],
        'previous': !exists(json, 'previous') ? undefined : json['previous'],
        'results': !exists(json, 'results') ? undefined : ((json['results'] as Array<any>).map(MyAnswersFromJSON)),
    };
}

export function PaginatedMyAnswersListToJSON(value?: PaginatedMyAnswersList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'next': value.next,
        'previous': value.previous,
        'results': value.results === undefined ? undefined : ((value.results as Array<any>).map(MyAnswersToJSON)),
    };
}
