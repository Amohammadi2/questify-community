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
  ProfileWrite,
} from '../models';
import {
    ProfileWriteFromJSON,
    ProfileWriteToJSON,
} from '../models';

export interface ProfilesPartialUpdateRequest {
    id: number;
    user?: number;
    bio?: string | null;
    profileImg?: Blob | null;
    email?: string;
}

export interface ProfilesUpdateRequest {
    id: number;
    user: number;
    email: string;
    bio?: string | null;
    profileImg?: Blob | null;
}

/**
 * 
 */
export class ProfilesApi extends runtime.BaseAPI {

    /**
     */
    async profilesPartialUpdateRaw(requestParameters: ProfilesPartialUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ProfileWrite>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling profilesPartialUpdate.');
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
        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.user !== undefined) {
            formParams.append('user', requestParameters.user as any);
        }

        if (requestParameters.bio !== undefined) {
            formParams.append('bio', requestParameters.bio as any);
        }

        if (requestParameters.profileImg !== undefined) {
 // @ts-ignore
            formParams.append('profile_img', requestParameters.profileImg as any, 'prof-img.png');
        }

        if (requestParameters.email !== undefined) {
            formParams.append('email', requestParameters.email as any);
        }

        const response = await this.request({
            path: `/api/v1/profiles/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProfileWriteFromJSON(jsonValue));
    }

    /**
     */
    async profilesPartialUpdate(requestParameters: ProfilesPartialUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ProfileWrite> {
        const response = await this.profilesPartialUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async profilesUpdateRaw(requestParameters: ProfilesUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ProfileWrite>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling profilesUpdate.');
        }

        if (requestParameters.user === null || requestParameters.user === undefined) {
            throw new runtime.RequiredError('user','Required parameter requestParameters.user was null or undefined when calling profilesUpdate.');
        }

        if (requestParameters.email === null || requestParameters.email === undefined) {
            throw new runtime.RequiredError('email','Required parameter requestParameters.email was null or undefined when calling profilesUpdate.');
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
        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.user !== undefined) {
            formParams.append('user', requestParameters.user as any);
        }

        if (requestParameters.bio !== undefined) {
            formParams.append('bio', requestParameters.bio as any);
        }

        if (requestParameters.profileImg !== undefined) {
 // @ts-ignore
            formParams.append('profile_img', requestParameters.profileImg as any, 'prof-img.png');
        }

        if (requestParameters.email !== undefined) {
            formParams.append('email', requestParameters.email as any);
        }

        const response = await this.request({
            path: `/api/v1/profiles/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProfileWriteFromJSON(jsonValue));
    }

    /**
     */
    async profilesUpdate(requestParameters: ProfilesUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ProfileWrite> {
        const response = await this.profilesUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
