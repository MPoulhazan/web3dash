import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { getAllChains } from 'src/shared/service/base.service';
import { ChainPayload } from 'src/models/ChainPayload.model';
import { dataService } from 'src/shared/service/data.service';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu() {
  const ref = useRef<any>(null);
  const [chainId, setChaindId] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);
  const [chains, setChains] = useState<ChainPayload>(null);

  useEffect(() => {
    loadGetAllChains();
  }, []);

  const loadGetAllChains = () => {
    setIsLoaded(false);
    getAllChains().then(
      (result) => {
        setIsLoaded(true);
        setChains(result.data);
        if (!chainId) setChaindId(result.data.items[0].name);
      },
      (error) => {
        console.error(error);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  const handleChange = (event: SelectChangeEvent<typeof chainId>) => {
    const {
      target: { value }
    } = event;
    setChaindId(value);
    const chainIdSelect = chains.items.filter((ch) => ch.name === value);
    dataService.setChainData(
      !!chainIdSelect && chainIdSelect.length ? chainIdSelect[0].chain_id : '1'
    );
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Chain</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={chainId}
          onChange={handleChange}
          input={<OutlinedInput label="Chain" />}
        >
          {!!chains &&
            chains.items.map((chain) => (
              <MenuItem key={chain.chain_id} value={chain.name}>
                <Box display="flex" alignItems="center">
                  <img width="15px" src={chain.logo_url} />
                  <span
                    style={{ marginLeft: '5px', textTransform: 'uppercase' }}
                  >
                    {chain.name}
                  </span>
                </Box>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}

export default HeaderMenu;
