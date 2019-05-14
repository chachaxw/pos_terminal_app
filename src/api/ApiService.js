import AxiosInstance from './AxiosInstance';
import { apiUrl, authKey, authHost } from './config';

export class ApiService {

  postVerification(params) {
    return AxiosInstance.post(apiUrl.verification, params, {
      baseURL: authHost,
      headers: {
        'X-Authy-API-Key': authKey,
      }
    });
  }

  postProfile(params) {
    return AxiosInstance.post(apiUrl.profile, params);
  }

}
