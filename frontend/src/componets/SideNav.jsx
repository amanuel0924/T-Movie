import Drawer from '@mui/material/Drawer';
import { Avatar, Box, Stack } from '@mui/material'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StarIcon from '@mui/icons-material/Star';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { ChevronIcon, LeafIcon} from '../componets/icons';
import { useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';


const LeftSideNav = () => {
  const isXS = useMediaQuery('(max-width:600px)')
  const location = useLocation();
  return (
    <Drawer
      variant="permanent"
      anchor="left"
    width={150}

    >
      <Stack spacing={{xs:0}} sx={{height:'100%',width:150 }}  >
    {
       !isXS &&  <Stack  sx={{height:'40%' ,justifyContent:'center',alignItems:'end' }}>
       {
              location.pathname.includes('detail') ? <ChevronIcon size={35} p={7}/>: <LeafIcon size={60} />
       }
     </Stack>
    }
     <Stack pr={1}  direction={{ xs: 'row', sm: 'column' }} spacing={6}  sx={{ height:{xs:'100%' ,sm:'60%'}, color: 'primary.contrastText',justifyContent:{xs:'center' ,sm:'start'} ,alignItems: 'end'}}>
     <Box>
     <Avatar sx={{background:"linear-gradient(132deg, rgba(47,47,98,1) 31%, rgba(67,67,163,1) 48%, rgba(27,45,95,1) 78%)",p:3 }}  >
 <LiveTvIcon fontSize='small'  />
     </Avatar>
     </Box>
  <Box>
  <Avatar sx={{bgcolor: '#161638',p:3 }}  >
 <StarIcon fontSize='small'  />
</Avatar>
  </Box>
<Box>
<Avatar sx={{bgcolor: '#161638',p:3 }}  >
 <AccessTimeFilledIcon fontSize='small'  />
</Avatar>
</Box>
     </Stack>
   </Stack>
    </Drawer>
  );
};

export default LeftSideNav;
