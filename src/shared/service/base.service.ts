import {
  INVALID_TOKEN_MSG as INVALID_KEY_MSG,
  UNKNOWN_ERROR_MSG
} from 'src/models/Constants.model';
import { ChainHttpResponse } from 'src/models/ChainHttpResponse.model';
import { HttpError } from 'src/models/HttpError.model';

const COVALENT_API_URL = 'https://api.covalenthq.com/v1/';
const COVALENT_CHAIN_API_PATH = 'chains/';
const COVALENT_API_KEY = process.env.REACT_APP_COVALENT_API_KEY;

const params = new URLSearchParams({
  'quote-currency': 'USD',
  format: 'JSON',
  key: COVALENT_API_KEY
});

export const getAllChains = (): Promise<ChainHttpResponse> => {
  return fetch(COVALENT_API_URL + COVALENT_CHAIN_API_PATH + `?${params}`).then(
    (response: any) => {
      if (response.status >= 200 && response.status < 204) {
        return response.json();
      } else if (response.status === 403) {
        return Promise.reject({
          code: 403,
          message: INVALID_KEY_MSG
        } as HttpError);
      } else {
        return Promise.reject({
          code: response.status,
          message: UNKNOWN_ERROR_MSG
        } as HttpError);
      }
    }
  );
};
