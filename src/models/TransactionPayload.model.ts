import { BlockTransactionWithLogEventsPayload } from './BlockTransactionWithLogEvents.model';

export interface TransactionPayload {
  address: string;
  updated_at: string;
  next_update_at: string;
  quote_currency: string;
  chain_id: number;
  items: BlockTransactionWithLogEventsPayload[];
}
