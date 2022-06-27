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

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: ['Bitcoin', 'Ripple', 'Cardano', 'Ethereum'],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
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
