import { RUAH_API_BASE_PROD } from '../constants/Api';
import Api from '../app/lib/api';

export default class MessageApi {
  static GetCollections(auth) {
    return Api.get(`${RUAH_API_BASE_PROD}/v1/product/getcollections`, auth);
  }
}
