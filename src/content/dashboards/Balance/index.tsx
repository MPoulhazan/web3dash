import { Helmet } from 'react-helmet-async';
import { Container, Grid, useTheme } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import Wallets from './Wallets';

function DashboardBalance() {
  const theme = useTheme();

  return (
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
            <Wallets />
          </Grid>
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>{' '}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardBalance;
