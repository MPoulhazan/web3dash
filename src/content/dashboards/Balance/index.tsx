import { Helmet } from 'react-helmet-async';
import { Container, Grid, useTheme } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import Wallets from './Wallets';
import { useEffect, useState } from 'react';
import { combineLatest, Subject } from 'rxjs';
import { Balance, balanceFromDTO } from 'src/models/Balance.model';
import { dataService } from 'src/shared/service/data.service';
import { getTokenBalance } from 'src/shared/service/balance.service';
import { HttpError } from 'src/models/HttpError.model';
import { Navigate } from 'react-router';

function DashboardBalance() {
  const theme = useTheme();

  const [error, setError] = useState<HttpError>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chainId, setChainId] = useState('');
  const [balances, setBalances] = useState<Balance[]>([]);
  const destroy$ = new Subject<boolean>();

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
          result.data.items
            .map((bl, idx) => balanceFromDTO(bl, idx))
            .sort((a, b) => b.quote - a.quote)
        );
      },
      (error) => {
        console.error(error);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  return !error ? (
    <>
      <Helmet>
        <title>Balance Dashboard</title>
      </Helmet>
      <Container maxWidth="lg" style={{ paddingTop: `${theme.spacing(4)}` }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <Wallets balances={balances} />
          </Grid>
          <Grid item xs={12}>
            <AccountBalance balances={balances} />
          </Grid>{' '}
        </Grid>
      </Container>
      <Footer />
    </>
  ) : (
    <Navigate to="/status/500" replace />
  );
}

export default DashboardBalance;
