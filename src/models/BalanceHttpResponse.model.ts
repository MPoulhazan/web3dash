import { BalanceApiPayload } from './BalancePayload.model';
import { HttpResponseCovalent } from './HttpResponseCovalent.model';

export interface BalanceHttpResponse extends HttpResponseCovalent {
  data: BalanceApiPayload;
}
