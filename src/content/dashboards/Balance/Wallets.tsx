import {
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  styled
} from '@mui/material';
import { Balance } from 'src/models/Balance.model';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

interface Props {
  balances: Balance[];
}

function Wallets(props: Props) {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">Top 4 Wallets</Typography>
      </Box>
      <Grid container spacing={3}>
        {props.balances.slice(0, 4).map((bl, i) => (
          <Grid key={i} xs={12} sm={6} md={3} item>
            <Card
              sx={{
                px: 1
              }}
            >
              <CardContent>
                <AvatarWrapper>
                  <img
                    alt={bl.contract_name}
                    src={bl.logo_url}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src =
                        '/static/images/placeholders/logo/crypto-default.png';
                    }}
                  />
                </AvatarWrapper>
                <Typography variant="h5" noWrap>
                  {bl.contract_name}
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  {bl.contract_ticker_symbol}
                </Typography>
                <Box
                  sx={{
                    pt: 3
                  }}
                >
                  <Typography variant="h3" gutterBottom noWrap>
                    {bl.quote_human_redeable + '$'}
                  </Typography>
                  <Typography variant="subtitle2" noWrap>
                    {bl.quote_rate || 0}$
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Wallets;
