import { Card, Box, Grid, Typography, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridComparatorFn } from '@mui/x-data-grid';
import type { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import { dataService } from 'src/shared/service/data.service';
import { combineLatest, forkJoin, Subject, takeUntil } from 'rxjs';
import { getTokenBalance } from 'src/shared/service/balance.service';
import { Balance, balanceFromDTO } from 'src/models/Balance.model';
import { formatQuote } from 'src/shared/service/utils.service';

interface Props {
  balances: Balance[];
}

const AccountBalance = (props: Props) => {
  const [chainId, setChainId] = useState('');

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
      flex: 2,
      sortable: false
    },
    {
      field: 'quote',
      headerName: 'Amout',
      description: 'Total amout in USD',
      type: 'number',
      flex: 1,
      renderCell: (params) => {
        return <b>{formatQuote(params.value) + '$'}</b>;
      }
    }
  ];

  return (
    props.balances && (
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
            rows={props.balances}
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
