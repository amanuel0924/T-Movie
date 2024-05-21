import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Box, Stack} from '@mui/material';

import { useMediaQuery } from '@mui/material';
import SideNav from '../componets/SideNav';







function ResponsiveGrid() {
  const isXS = useMediaQuery('(max-width:600px)')
  return (
    <Box sx={{ height: '100vh',backgroundColor: '#0E0E30' }}>
      <CssBaseline />
      <Grid container sx={{ height: '100%', }}>
        <Grid
          item
          xs={12}
          sm={10}
          sx={{
            backgroundColor: 'yellow',
            order: { xs: 1, sm: 4 },
            height: '100%',
            position: 'relative',
          }}
        >
          <Stack height={'100%'}>
            <Stack
            bgcolor={'#181A41'}
            height={{xs:'10%',sm:'20%'}}
            ></Stack>
            <Stack
            bgcolor={'gray'}
            height={{xs:'90%',sm:'80%'}}
            ></Stack>
          </Stack>
        </Grid>
       {!isXS &&  <Grid
          item
          xs={12}
          sm={2}
          sx={{
            backgroundColor: 'blue',
            order: { xs: 4, sm: 1 },
            height: {xs:'50%',sm:'100%'}
          }}
        >
          <SideNav/>
        </Grid>}
      </Grid>
    </Box>
  );
}

export default ResponsiveGrid;
