
import {  Box, Stack, Avatar, Typography } from '@mui/material';
import { HboIcon, DisnyIcon, CnnIcon,CctvIcon, EspnIcon, NbcIcon, AmcIcon, AbcIcon,FoxIcon} from '../componets/icons';
import { useState } from 'react';




const Channels = () => {
    const [isActive,setIsActive] = useState(5);

    const channels = [
        {id:1 ,icon: <FoxIcon size={32} />, label: "FOX TV" },
        {id:2, icon: <AbcIcon size={38} />, label: "ABC TV" },
        {id:3, icon: <AmcIcon size={38} />, label: "AMC TV" },
        {id:4, icon: <NbcIcon size={35} />, label: "NBC TV" },
        {id:5, icon: <HboIcon size={32} />, label: "HBO TV"},
        {id:6, icon: <CctvIcon size={38} />, label: "City Tv" },
        {id:7, icon: <EspnIcon size={30} />, label: "ESPN" },
        {id:8, icon: <DisnyIcon size={35} />, label: "Diseny" },
        {id:9, icon: <CnnIcon size={32} />, label: "CNN",  }
      ];
  return (
    <Box   sx={{display:'flex',flexDirection:{xs:'row',sm:'column'},color:'white' ,gap:{xs:'15px',sm:'5px'},height:'100%',width:'100%' , overflow: 'auto' ,justifyContent:'center' ,alignItems: 'center', '& > *': {
        scrollSnapAlign: 'center',
      },
      '::-webkit-scrollbar': { display: 'none' },}}>
            {channels.map((channel) => (
                <Stack onClick={()=>setIsActive(channel.id)} spacing={1}  key={channel.id}  direction={{ xs: 'column', sm: 'row' }}sx={{justifyContent:'start',alignItems:'center',cursor:'pointer'}}>
                <Box  sx={{border:isActive===channel.id?'solid #272951 3px ':'none',borderRadius:'100%',p:1}}>
                <Avatar  sx={{bgcolor: '#161638',p:isActive==channel.id?4:0, }} >
              {channel.icon}
                </Avatar >
                  </Box>
                <Typography fontWeight={isActive==channel.id?'bolder':''} variant={isActive==channel.id?'body1':'caption'}>{channel.label}</Typography>
                </Stack>
            ))}

          
         
          {/* <Stack spacing={1}  direction={{ xs: 'column', sm: 'row' }}alignItems={'center'} justifyContent={'start'} >
          <Box sx={{border:isActive===9?'solid black 2px ':'none',borderRadius:'100%',p:1}}>
          <Avatar  sx={{bgcolor: '#161638',p:isActive==9?4:0 }} >
     <CnnIcon size={isActive==9?40:30} />
          </Avatar >
            </Box>
          <Typography variant={isActive==9?'h6':'body1'}>CNN</Typography>
          </Stack> */}
          </Box>
  )
}

export default Channels