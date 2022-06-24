import { ChainPayload } from './ChainPayload.model';
import { HttpResponseCovalent } from './HttpResponseCovalent.model';

export interface ChainHttpResponse extends HttpResponseCovalent {
  data: ChainPayload;
}
