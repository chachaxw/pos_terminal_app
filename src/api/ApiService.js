import AxiosInstance from './AxiosInstance';
import { apiUrl, authKey } from './config';

class ApiService {

  postVerification(params) {
    return AxiosInstance.post(apiUrl.verification, params, {
      headers: {
        'X-Authy-API-Key': authKey,
      }
    });
  }

  postProfile(params) {
    return AxiosInstance.post(apiUrl.profile, params);
  }

}
