import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Hero from './Hero';
import { Logo } from 'src/components/Logo';
import './overview.scss';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {
  const introDelayInMs = 2000;
  const [redirect, setRedirect] = useState<boolean>(false);
  useEffect(() => {
    delayAndRedirect();
  }, []);

  function delayAndRedirect() {
    setTimeout(() => setRedirect(true), introDelayInMs);
  }

  return !redirect ? (
    <OverviewWrapper className="overview">
      <Helmet>
        <title>Web3 Covalent Dashboard</title>
      </Helmet>
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          py={5}
          alignItems="center"
          height="100vh"
          sx={{ fontSize: { xs: '1em', md: '3em' } }}
        >
          <Logo darkTheme={false} />
        </Box>
      </Container>
    </OverviewWrapper>
  ) : (
    <Navigate to="dashboards/balance" replace />
  );
}

export default Overview;
function useHistory() {
  throw new Error('Function not implemented.');
}
