export interface LogEvent {
  block_signed: string;
  block_height: number;
  tx_offset: number;
  log_offset: number;
  tx_hash: string;
  raw_log_topics: string[];
  sender_contract_decimals: number;
  sender_name: string;
  sender_contract_ticker_symbol: string;
  sender_address: string;
  sender_address_label: string;
  sender_logo_url: string;
  raw_log_data: string;
}
