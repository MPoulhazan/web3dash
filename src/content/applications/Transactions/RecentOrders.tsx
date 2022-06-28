import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import {
  BlockTransactionWithLogEvents,
  mapTransactionFromDTO
} from 'src/models/BlockTransactionWithLogEvents.model';
import { combineLatest } from 'rxjs';
import { dataService } from 'src/shared/service/data.service';
import { getTokenTransaction } from 'src/shared/service/transaction.service';
import { useEffect, useState } from 'react';

function RecentOrders() {
  const [blockTransactionWithLogEvents, setBlockTransactionWithLogEvents] =
    useState<BlockTransactionWithLogEvents[]>([]);

  useEffect(() => {
    getParamsAndCallApi();
  }, []);

  const getParamsAndCallApi = () => {
    combineLatest([
      dataService.getChainData(),
      dataService.getAddressData()
    ]).subscribe((value) => {
      const [chainId, address] = [...value];
      loadTokenTransaction(chainId, address);
    });
  };

  const loadTokenTransaction = (chainId: string, address: string) => {
    getTokenTransaction(chainId, address).then(
      (result) => {
        setBlockTransactionWithLogEvents(
          result.data.items.map((tr, idx) => mapTransactionFromDTO(tr, idx))
        );
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <Card>
      {blockTransactionWithLogEvents && (
        <RecentOrdersTable cryptoOrders={blockTransactionWithLogEvents} />
      )}
    </Card>
  );
}

export default RecentOrders;
