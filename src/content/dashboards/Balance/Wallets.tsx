import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,
  styled
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
import { combineLatest, Subject } from 'rxjs';
import { Balance, balanceFromDTO } from 'src/models/Balance.model';
import { dataService } from 'src/shared/service/data.service';
import { getTokenBalance } from 'src/shared/service/balance.service';

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

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(['all'])};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
);

function Wallets() {
  const [error, setError] = useState(null);
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
            .sort((a, b) => parseInt(a.balance) - parseInt(b.balance))
            .slice(0, 4)
        );
      },
      (error) => {
        console.error(error);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

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
        <Typography variant="h3">Favorites Wallets</Typography>
      </Box>
      <Grid container spacing={3}>
        {balances.map((bl, i) => (
          <Grid key={i} xs={12} sm={6} md={3} item>
            <Card
              sx={{
                px: 1
              }}
            >
              <CardContent>
                <AvatarWrapper>
                  <img
                    alt="BTC"
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
                    {bl.balance}
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
