// BottomNav.js
import {useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StarIcon from '@mui/icons-material/Star';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Avatar} from '@mui/material';
import Img from './../assets/ava.png'

import { Paper } from '@mui/material';


const BottomNav = () => {
  const [value, setValue] = useState(0);

  return (
    <Paper  sx={{backgroundColor: '#0E0E30', position: 'fixed', bottom: 0, left: 0, right: 0 , zIndex:67}} elevation={6}>
        <BottomNavigation
          showLabels
          value={value}
          sx={{backgroundColor: '#0E0E34'}}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
            <BottomNavigationAction  icon={<Avatar sx={{background:"linear-gradient(132deg, rgba(47,47,98,1) 31%, rgba(67,67,163,1) 48%, rgba(27,45,95,1) 78%)",p:2 }}  >
<LiveTvIcon fontSize='small'  />
</Avatar>} />
            <BottomNavigationAction  icon={<Avatar sx={{bgcolor: '#161638',p:2 }}  >
<StarIcon fontSize='small'  />
</Avatar>} />
            <BottomNavigationAction  icon={<Avatar sx={{bgcolor: '#161638',p:2 }}  >
<AccessTimeFilledIcon fontSize='small'  />
</Avatar>} />
<BottomNavigationAction  icon={<Avatar alt="Remy Sharp" src={Img} />} />
        </BottomNavigation>

      
      </Paper>
  );
};

export default BottomNav;

{/* <Stack pr={1}  direction={{ xs: 'row', sm: 'column' }} spacing={6}  sx={{ height:{xs:'100%' ,sm:'60%'}, color: 'primary.contrastText',justifyContent:{xs:'center' ,sm:'start'} ,alignItems: 'end'}}>
<Avatar sx={{background:"linear-gradient(132deg, rgba(47,47,98,1) 31%, rgba(67,67,163,1) 48%, rgba(27,45,95,1) 78%)",p:3 }}  >
<LiveTvIcon fontSize='small'  />
</Avatar>
<Avatar sx={{bgcolor: '#161638',p:3 }}  >
<StarIcon fontSize='small'  />
</Avatar>

</Stack> */}
