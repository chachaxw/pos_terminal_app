import AxiosInstance from './AxiosInstance';
import { apiUrl, authKey, authHost } from './config';

export class ApiService {

  postVerification(data, params) {
    return AxiosInstance.post(apiUrl.verification, data, {
      params,
      baseURL: authHost,
      headers: {
        'X-Authy-API-Key': authKey,
      }
    });
  }

  postProfile(data) {
    return AxiosInstance.post(apiUrl.profile, data);
  }

}
