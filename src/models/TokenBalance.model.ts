export interface TokenBalance {
  address: string;
  updated_at: string;
  next_update_at: string;
  quote_currency: string;
  chain_id: number;
  items: number[];
  pagination: any;
}
