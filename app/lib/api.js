import { maybeProvideDispatch } from '../../store';
import { info } from '../actions/logging';

class Api {
  static headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      dataType: 'json',
      'X-Requested-With': 'XMLHttpRequest',
    };
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST');
  }

  static xhr(route, params, verb) {
    const options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null);
    options.headers = Api.headers();
    const dispatch = maybeProvideDispatch();
    if (dispatch) {
      dispatch(info({
        route,
        options,
      }));
    }
    return fetch(route, options).then((response) => {
      if (dispatch) {
        dispatch(info(response));
      }

      const json = response.json();
      if (response.ok) {
        return json;
      }
      return json.then((err) => { throw err; });
    });
  }
}

export default Api;
