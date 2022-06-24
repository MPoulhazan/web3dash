import { BalancePayload } from './Balance.model';

export interface BalanceApiPayload {
  address: string;
  chain_id: number;
  items: BalancePayload[];
  next_update_at: string;
  pagination: unknown;
  quote_currency: string;
  updated_at: string;
}
