/**
 * @format
 * @flow
 */

 import qs from 'qs';
import AxiosInstance from './AxiosInstance';
import { apiUrl, authKey, authHost, apiKey, publicKey, tokenApiKey } from './config';

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

  getGuests() {
    return AxiosInstance.get(apiUrl.guests);
  }

  getWallet(id: string) {
    return AxiosInstance.get(`${apiUrl.wallet}/${id}`);
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
    return AxiosInstance.post(apiUrl.profile, data, {
      headers: {
        api_key: apiKey,
        'content-type': 'multipart/form-data',
      },
    });
  }

  postGuests(id: string, params: object) {
    return AxiosInstance.post(`${apiUrl.guests}/${id}/register`, params);
  }

  postTransactions(params: object) {
    return AxiosInstance.post(`${apiUrl.transactions}`, params);
  }
}
