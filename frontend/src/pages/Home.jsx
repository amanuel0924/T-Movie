import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Box, Stack, Avatar, Typography } from '@mui/material';
import { LeafIcon,HboIcon } from '../componets/icons';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StarIcon from '@mui/icons-material/Star';
import LiveTvIcon from '@mui/icons-material/LiveTv';


function ResponsiveGrid() {
  return (
    <Box sx={{ height: '100vh',backgroundColor: '#0E0E30' }}>
      <CssBaseline />
      <Grid container sx={{ height: '100%', }}>
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            backgroundColor: '#0E0E30',
            order: { xs: 1, sm: 4 },
            height: {xs:'50%',sm:'100%'}
          }}
        >
          item4
        </Grid>
        <Grid
          item
          xs={12}
          sm={2}
          sx={{
            backgroundColor: '#0E0E30',
            order: { xs: 4, sm: 1 },
            height: {xs:'10%',sm:'100%'}
          }}
        >
          <Stack spacing={{xs:0}} sx={{height:'100%' }}>
            <Box sx={{height:'40%' ,justifyContent:'center',alignItems:'center',display: { xs: 'none', sm: 'flex' }, }}>
              <LeafIcon size={60}/>
            </Box>
            <Stack  direction={{ xs: 'row', sm: 'column' }} spacing={4}  sx={{ height:{xs:'100%' ,sm:'60%'}, color: 'primary.contrastText',justifyContent:{xs:'space-evenly' ,sm:'start'} ,alignItems: 'center'}}>
            <Avatar>
        <LiveTvIcon />
            </Avatar>
      <Avatar>
        <StarIcon />
      </Avatar>
      <Avatar>
        <AccessTimeFilledIcon />
      </Avatar>
      <Avatar sx={{ bgcolor: 'purple', display: { xs: 'flex', sm: 'none' } }}>OP</Avatar>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sm={2}
          sx={{
            backgroundColor: '#0E0E30',
            order: { xs: 2, sm: 2 },
            height: {xs:'15%',sm:'100%'},
            marginTop: { xs: 2, sm: 0 },
          }}
        >
           <Stack  direction={{ xs: 'row', sm: 'column' }} spacing={3}  sx={{ height:'100%' , overflow: 'auto' ,color: 'primary.contrastText',justifyContent:{xs:'center' ,sm:'center'} ,alignItems: 'center', '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },}}>
           <Stack spacing={1}  direction={{ xs: 'column', sm: 'row' }} alignItems={'center'} justifyContent={'start'} >
           <Avatar>
        <HboIcon />
            </Avatar>
            <Typography>Live</Typography>
            </Stack>

            <Stack spacing={1}  direction={{ xs: 'column', sm: 'row' }} alignItems={'center'} justifyContent={'start'} >
           <Avatar>
        <HboIcon />
            </Avatar>
            <Typography>Live</Typography>
            </Stack>
            <Stack spacing={1}  direction={{ xs: 'column', sm: 'row' }}alignItems={'center'} justifyContent={'start'} >
           <Avatar>
        <HboIcon />
            </Avatar>
            <Typography>Live</Typography>
            </Stack>
            <Stack spacing={1}  direction={{ xs: 'column', sm: 'row' }}alignItems={'center'} justifyContent={'start'} >
           <Avatar>
        <HboIcon />
            </Avatar>
            <Typography>Live</Typography>
            </Stack>
           
           <Stack spacing={0}   direction={{ xs: 'column', sm: 'row', }} alignItems={'center'} justifyContent={'start'} >
           <Box sx={{border:'solid black 2px ',borderRadius:'100%',p:1}}>
           <Avatar sx={{p:4,}}>
        <HboIcon />
            </Avatar>
            </Box>
            <Typography variant='body1' fontWeight='bolder' >HBO</Typography>
            </Stack>
          
            <Stack spacing={1}  direction={{ xs: 'column', sm: 'row' }} alignItems={'center'} justifyContent={'start'} >
           <Avatar>
        <HboIcon />
            </Avatar>
            <Typography>Live</Typography>
            </Stack>
            <Stack spacing={1}  direction={{ xs: 'column', sm: 'row' }} alignItems={'center'} justifyContent={'start'} >
           <Avatar>
        <HboIcon />
            </Avatar>
            <Typography>Live</Typography>
            </Stack>
            <Stack spacing={1}  direction={{ xs: 'column', sm: 'row' }} alignItems={'center'} justifyContent={'start'} >
           <Avatar>
        <HboIcon />
            </Avatar>
            <Typography>Live</Typography>
            </Stack>
            <Stack spacing={1}  direction={{ xs: 'column', sm: 'row' }}alignItems={'center'} justifyContent={'start'} >
           <Avatar>
        <LiveTvIcon />
            </Avatar>
            <Typography>Live</Typography>
            </Stack>
      
     
            </Stack>
          
        </Grid>
        <Grid
          component={Grid}
          item
          xs={12}
          sx={{
            backgroundColor: '#0E0E30',
            display: { xs: 'block', sm: 'none' },
            order: { xs: 3 },
            height: {xs:'25%',sm:'100%'}
          }}
        >
          item3
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResponsiveGrid;
