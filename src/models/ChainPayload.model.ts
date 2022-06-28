import { Chain } from './Chain.model';

export interface ChainPayload {
  updated_at: string;
  items: Chain[];
  pagination: unknown;
}
