import { Avatar, Stack } from '@mui/material'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StarIcon from '@mui/icons-material/Star';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { ChevronIcon, LeafIcon} from '../componets/icons';
import { useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';



const SideNav = (prop) => {
    const location = useLocation();
    const isXS = useMediaQuery('(max-width:600px)')
  return (
    <Stack spacing={{xs:0}} sx={{height:'100%' }}  >
    {
       !isXS &&  <Stack  sx={{height:'40%' ,justifyContent:'center',alignItems:'end' }}>
      
       {
              location.pathname.includes('detail') ? <ChevronIcon size={40} p={5}/>: <LeafIcon size={60} />
       }
     </Stack>
    }
     <Stack pr={1}  direction={{ xs: 'row', sm: 'column' }} spacing={6}  sx={{ height:{xs:'100%' ,sm:'60%'}, color: 'primary.contrastText',justifyContent:{xs:'center' ,sm:'start'} ,alignItems: 'end'}}>
     <Avatar>
 <LiveTvIcon />
     </Avatar>
<Avatar>
 <StarIcon />
</Avatar>
<Avatar>
 <AccessTimeFilledIcon />
</Avatar>
{prop.children}
     </Stack>
   </Stack>
  )
}

export default SideNav