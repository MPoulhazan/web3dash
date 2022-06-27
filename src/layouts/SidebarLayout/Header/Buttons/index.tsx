import { Box, Typography } from '@mui/material';
import HeaderSearch from './Search';
import { dataService } from 'src/shared/service/data.service';
import { useEffect, useState } from 'react';
import { Subject, takeUntil } from 'rxjs';

function HeaderButtons() {
  const [address, setAddress] = useState('');

  const destroy$ = new Subject<boolean>();

  useEffect(() => {
    getAddress();
  }, []);

  // Unmount
  useEffect(
    () => () => {
      destroy$.next(true);
    },
    []
  );

  const getAddress = () => {
    dataService
      .getAddressData()
      .pipe(takeUntil(destroy$))
      .subscribe((addr: string) => setAddress(addr));
  };

  return (
    <Box sx={{ mr: 1 }} display="flex" alignItems="center">
      <Typography sx={{ display: { xs: 'none', md: 'block' } }}>
        {address}
      </Typography>
      <HeaderSearch />
    </Box>
  );
}

export default HeaderButtons;
