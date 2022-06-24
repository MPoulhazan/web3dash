export interface BalancePayload {
  balance: string;
  balance_24h: string;
  contract_address: string;
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  last_transferred_at: unknown;
  logo_url: string;
  nft_data: unknown;
  quote: number;
  quote_24h: number;
  quote_rate: number;
  quote_rate_24h: number;
  supports_erc: unknown;
  type: string;
}

export interface Balance {
  id?: number;
  balance: string;
  contract_name: string;
  contract_ticker_symbol: string;
  logo_url: string;
  quote_rate: number;
}

export const balanceFromDTO = (
  balancePayload: BalancePayload,
  id?: number
): Balance => {
  return {
    id,
    balance: balancePayload.balance,
    contract_name: balancePayload.contract_name,
    contract_ticker_symbol: balancePayload.contract_ticker_symbol,
    logo_url: balancePayload.logo_url,
    quote_rate: balancePayload.quote_rate
  };
};
