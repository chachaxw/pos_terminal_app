/**
 * @format
 * @flow
 */

import AxiosInstance from './AxiosInstance';
import { apiUrl, authKey, authHost, tokenApiKey } from './config';

export class ApiService {

  getOtp(uuid: string) {
    return AxiosInstance.get(apiUrl.otp, {
      headers: {
        api_key: tokenApiKey,
        device_uuid: uuid,
      }
    });
  }

  getToken(uuid: string, data: string) {
    return AxiosInstance.get(apiUrl.token, {
      headers: {
        api_key: tokenApiKey,
        device_uuid: uuid,
        data,
      }
    });
  }

  postVerification(data: object, params: object) {
    return AxiosInstance.post(apiUrl.verification, data, {
      params,
      baseURL: authHost,
      headers: {
        'X-Authy-API-Key': authKey,
      }
    });
  }

  postProfile(data: object) {
    return AxiosInstance.post(apiUrl.profile, data);
  }

}
