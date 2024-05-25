/* eslint-disable react/prop-types */
import {  Box, Typography } from '@mui/material';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';

import { useNavigate } from 'react-router-dom';


const LgTypeCard = ({data}) => {
    const navigate = useNavigate();
  return (
    <Box 
    sx={{
     zIndex: 1,
      position: 'absolute',
      bottom: -90,
      right: 0,
      width: '100%',
      height:'290px',
      gap: 6,
      left: 0,
      p: 0.5,
      margin: 0,
      alignItems: 'center',
      overflow: 'auto',
      display: { xs: 'none', sm: 'flex' },
      scrollSnapType: 'x mandatory',
      '& > *': {
        scrollSnapAlign: 'center',
      },
      '::-webkit-scrollbar': { display: 'none' },
    }}
  >
    {data?.map((item) => (
      <Card   size="large"  key={item.title} sx={{  borderRadius:'3px',  backdropFilter: 'blur(3px)',backgroundColor: 'rgba(25, 26, 56, 0.9)',height:item.current ? '270px' :'230px' ,border:'solid 1px #0F102D',position:'relative',cursor:'pointer'}}>
        <AspectRatio  ratio={1.5 } sx={{ minWidth: 180 }}>
          <Box  color={'white'}  bgcolor={'#0F102D'}>
            {item.icon}
          </Box>
        </AspectRatio>
        <Box component={'div'}  color={'white'} sx={{ whiteSpace: 'nowrap', mx: 1, py:item.current?4:1}} onClick={()=>navigate('/detail')}>
          <Typography variant={item.current?'h5':'h6'}  >{item.title}</Typography>
          <Typography level="body-sm">{item.description}</Typography>
        </Box>
       {
        item.current &&   <Box width={'30%'} height={'10px'} sx={{position:'absolute'}} bottom={-9} left={'33%'} bgcolor={'white' } >
        </Box>
       }
      </Card>
    ))}
     
  </Box>
  )
}

export default LgTypeCard