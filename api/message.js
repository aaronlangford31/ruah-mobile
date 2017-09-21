import { RUAH_API_BASE_PROD } from '../constants/Api';
import Api from '../app/lib/api';

export default class MessageApi {
  static GetConversations(from, auth) {
    return Api.get(`${RUAH_API_BASE_PROD}/v1/message/get?from=${from}`, auth);
  }

  static SendMessage(message, auth) {
    return Api.post(`${RUAH_API_BASE_PROD}/v1/message/send`, message, auth);
  }
}
