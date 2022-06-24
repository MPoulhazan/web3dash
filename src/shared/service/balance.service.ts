import {
  INVALID_TOKEN_MSG as INVALID_KEY_MSG,
  UNKNOWN_ERROR_MSG
} from 'src/models/Constants.model';
import { ChainHttpResponse } from 'src/models/ChainHttpResponse.model';
import { HttpError } from 'src/models/HttpError.model';
import { BalanceHttpResponse } from 'src/models/BalanceHttpResponse.model';

const COVALENT_API_URL = 'https://api.covalenthq.com/v1/';
const COVALENT_ADDRESS_API_PATH = 'address/';
const COVALENT_BALANCES_API_PATH = 'balances_v2/';
const COVALENT_API_KEY = 'ckey_64ffdaea1cae48b7bbf9b7580a6';

const params = new URLSearchParams({
  format: 'JSON',
  key: COVALENT_API_KEY
});

export const getTokenBalance = (
  chainId: string,
  address: string
): Promise<BalanceHttpResponse> => {
  return fetch(
    COVALENT_API_URL +
      `${chainId}/` +
      COVALENT_ADDRESS_API_PATH +
      `${address}/` +
      COVALENT_BALANCES_API_PATH +
      `?${params}`
  ).then((response: any) => {
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
  });
};
