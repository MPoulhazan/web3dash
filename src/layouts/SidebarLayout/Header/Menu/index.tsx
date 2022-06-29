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
import { HttpError } from 'src/models/HttpError.model';
import { Navigate } from 'react-router';

function HeaderMenu() {
  const ref = useRef<any>(null);
  const [chainId, setChaindId] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<HttpError>(null);
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
      {!error ? (
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
      ) : (
        <Navigate to="/status/500" replace />
      )}
    </>
  );
}

export default HeaderMenu;
