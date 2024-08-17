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
  Notification,
  NotificationNumber,
  PaginatedNotificationList,
} from '../models';
import {
    NotificationFromJSON,
    NotificationToJSON,
    NotificationNumberFromJSON,
    NotificationNumberToJSON,
    PaginatedNotificationListFromJSON,
    PaginatedNotificationListToJSON,
} from '../models';

export interface NotificationsListRequest {
    limit?: number;
    offset?: number;
}

export interface NotificationsRetrieveRequest {
    id: number;
}

/**
 * 
 */
export class NotificationsApi extends runtime.BaseAPI {

    /**
     */
    async notificationsListRaw(requestParameters: NotificationsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedNotificationList>> {
        const queryParameters: any = {};

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/notifications/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedNotificationListFromJSON(jsonValue));
    }

    /**
     */
    async notificationsList(requestParameters: NotificationsListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedNotificationList> {
        const response = await this.notificationsListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Marks all unseen notifications as seen and returns an HTTP 200 status code to decalre success
     */
    async notificationsMarkSeenCreateRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/notifications/mark-seen/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Marks all unseen notifications as seen and returns an HTTP 200 status code to decalre success
     */
    async notificationsMarkSeenCreate(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.notificationsMarkSeenCreateRaw(initOverrides);
    }

    /**
     */
    async notificationsNumberRetrieveRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<NotificationNumber>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/notifications/number/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => NotificationNumberFromJSON(jsonValue));
    }

    /**
     */
    async notificationsNumberRetrieve(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<NotificationNumber> {
        const response = await this.notificationsNumberRetrieveRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async notificationsRetrieveRaw(requestParameters: NotificationsRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Notification>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling notificationsRetrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/notifications/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => NotificationFromJSON(jsonValue));
    }

    /**
     */
    async notificationsRetrieve(requestParameters: NotificationsRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Notification> {
        const response = await this.notificationsRetrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
