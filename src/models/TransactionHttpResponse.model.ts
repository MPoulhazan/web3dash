import { HttpResponseCovalent } from './HttpResponseCovalent.model';
import { TransactionPayload } from './TransactionPayload.model';

export interface TransactionHttpResponse extends HttpResponseCovalent {
  data: TransactionPayload;
}
