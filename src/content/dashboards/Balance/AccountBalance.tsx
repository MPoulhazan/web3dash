import { Card, Box, Grid, Typography, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import type { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import { dataService } from 'src/shared/service/data.service';
import { combineLatest, forkJoin, Subject, takeUntil } from 'rxjs';
import { getTokenBalance } from 'src/shared/service/balance.service';
import { Balance, balanceFromDTO } from 'src/models/Balance.model';

const AccountBalance = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chainId, setChainId] = useState('');
  const [balances, setBalances] = useState<Balance[]>([]);
  const destroy$ = new Subject<boolean>();

  const theme = useTheme();

  useEffect(() => {
    getParamsAndCallApi();
  }, []);

  // Unmount
  useEffect(
    () => () => {
      destroy$.next(true);
    },
    []
  );

  const getParamsAndCallApi = () => {
    combineLatest([
      dataService.getChainData(),
      dataService.getAddressData()
    ]).subscribe((value) => {
      const [chainId, address] = [...value];
      loadTokenBalance(chainId, address);
    });
  };

  const loadTokenBalance = (chainId: string, address: string) => {
    getTokenBalance(chainId, address).then(
      (result) => {
        setIsLoaded(true);
        setBalances(
          result.data.items.map((bl, idx) => balanceFromDTO(bl, idx))
        );
      },
      (error) => {
        console.error(error);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'logo_url',
      headerName: 'Logo',
      type: 'string',
      flex: 1,
      renderCell: (params) => {
        return (
          <Box display="flex">
            <img
              width="32px"
              src={params.value}
              alt=""
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  '/static/images/placeholders/logo/crypto-default.png';
              }}
            />
          </Box>
        );
      }
    },
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'contract_name', headerName: 'Contract name', flex: 1 },
    { field: 'contract_ticker_symbol', headerName: 'Symbol', flex: 1 },
    {
      field: 'balance',
      headerName: 'Balance',
      description: 'Balance in USD',
      type: 'number',
      flex: 2
    }
  ];

  return (
    balances && (
      <Card>
        <Box p={4}>
          <Typography
            sx={{
              pb: 3
            }}
            variant="h4"
          >
            Account Balance {chainId}
          </Typography>
          <DataGrid
            rows={balances}
            columns={columns}
            pageSize={30}
            rowsPerPageOptions={[5]}
            autoHeight
            autoPageSize
          />{' '}
        </Box>
      </Card>
    )
  );
};

export default AccountBalance;
