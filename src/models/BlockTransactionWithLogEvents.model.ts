import { LogEvent } from './LogEvents.model';

export interface BlockTransactionWithLogEvents {
  id: string;
  orderDetails: string;
  orderDate: Date;
  status: string;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}

export interface BlockTransactionWithLogEventsPayload {
  block_signed_at: string;
  block_height: number;
  tx_hash: string;
  tx_offset: number;
  successful: boolean;
  from_address: string;
  from_address_label: string;
  to_address: string;
  to_address_label: string;
  value: number;
  value_quote: number;
  gas_offered: number;
  gas_spent: number;
  gas_price: number;
  fees_paid: number;
  gas_quote: number;
  gas_quote_rate: number;
  log_events: LogEvent[];
}

export const mapTransactionFromDTO = (
  blockTransactionWithLogEventsPayload: BlockTransactionWithLogEventsPayload,
  id: number
): BlockTransactionWithLogEvents => {
  return {
    id: '' + id,
    orderDetails: null,
    orderDate: new Date(blockTransactionWithLogEventsPayload.block_signed_at),
    status: blockTransactionWithLogEventsPayload.successful
      ? 'completed'
      : 'failed',
    orderID: blockTransactionWithLogEventsPayload.tx_hash,
    sourceName: blockTransactionWithLogEventsPayload.from_address,
    sourceDesc: blockTransactionWithLogEventsPayload.from_address_label,
    amountCrypto: blockTransactionWithLogEventsPayload.value_quote,
    amount: blockTransactionWithLogEventsPayload.value,
    cryptoCurrency: blockTransactionWithLogEventsPayload.from_address_label,
    currency: '' + blockTransactionWithLogEventsPayload.fees_paid
  };
};
