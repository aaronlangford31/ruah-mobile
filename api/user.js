import { RUAH_API_BASE_PROD } from '../constants/Api';
import Api from '../app/lib/api';

export default class UserApi {
  static Authenticate(userId, password) {
    return Api.post(`${RUAH_API_BASE_PROD}/v1/user/authenticate`, {
      userId,
      password,
      persistAuthTicket: true,
    });
  }

  static GetStore(auth) {
    return Api.get(`${RUAH_API_BASE_PROD}/v1/store/get`, auth);
  }
}
