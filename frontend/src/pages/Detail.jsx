import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Box, Stack, Typography} from '@mui/material';

import { useMediaQuery } from '@mui/material';
import SideNav from '../componets/SideNav';
import TimeAndWeather from '../componets/TimeAndWeather';
import {  ChevronIcon } from '../componets/icons';







function ResponsiveGrid() {
  const isXS = useMediaQuery('(max-width:600px)')
  return (
    <Box sx={{ height: '100vh',backgroundColor: '#0E0E30' }}>
      <CssBaseline />
      <Grid container sx={{ height: '100%', }}>
        <Grid
          item
          xs={12}
          sm={11}
          sx={{
            backgroundColor: 'yellow',
            order: { xs: 1, sm: 4 },
            height: '100%',
            position: 'relative',
          }}
        >
          <Stack height={'100%'}>
            <Stack
            direction={'row'}
            py={{xs:2}}
            px={5}
            justifyContent={'space-between'}
            alignItems={'end'}
            bgcolor={'#0E0E30'}
            height={{xs:'10%',sm:'22%'}}
            >
              {isXS && <ChevronIcon  size={30} />}
              <Typography variant={'h5'} sx={{color:'white',textAlign:'center',paddingTop:2}}>Movies</Typography>
              <Stack>
              {!isXS &&  <TimeAndWeather>
                <Typography variant={'subtitle2'} sx={{color:'white',textAlign:'center'}}>Thuesday,Apr 4</Typography>
               </TimeAndWeather>}
            
              </Stack>
            </Stack>
            <Stack
            bgcolor={'gray'}
            height={{xs:'90%',sm:'78%'}}
            ></Stack>
          </Stack>
        </Grid>
       {!isXS &&  <Grid
          item
          
          sm={1}
          sx={{
            backgroundColor: '#0E0E30',
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
