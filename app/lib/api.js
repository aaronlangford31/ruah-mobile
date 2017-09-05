import { maybeProvideDispatch } from '../../store';
import { info } from '../actions/logging';
import { setApiAuthToken } from '../actions/app';

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

      if (response.ok) {
        const json = response.json();
        maybeSetAuthToken(response);
        return json;
      }
      return response.status;
    });
  }
}

function maybeSetAuthToken(response) {
  const cookies = response.headers.map['set-cookie'];
  if (!cookies || cookies.length === 0) {
    return;
  }
  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const match = cookie.match('([A-F]|[0-9]){16,}');
    if (match) {
      const dispatch = maybeProvideDispatch();
      if (dispatch) {
        dispatch(setApiAuthToken(match[0]));
      }
      break;
    }
  }
}

export default Api;
