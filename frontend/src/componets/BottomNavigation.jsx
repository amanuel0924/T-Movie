// BottomNav.js
import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StarIcon from '@mui/icons-material/Star';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ContactMailIcon from '@mui/icons-material/ContactMail';


const BottomNav = () => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="Home" icon={<LiveTvIcon fontSize='small'  />} />
      <BottomNavigationAction label="About" icon={<StarIcon fontSize='small'  />} />
      <BottomNavigationAction label="Services" icon={<AccessTimeFilledIcon fontSize='small'  />} />
      <BottomNavigationAction label="Contact" icon={<ContactMailIcon />} />
    </BottomNavigation>
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
<Avatar sx={{bgcolor: '#161638',p:3 }}  >
<AccessTimeFilledIcon fontSize='small'  />
</Avatar>
</Stack> */}
