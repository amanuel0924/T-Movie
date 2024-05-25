import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Box, Stack, Avatar, Typography } from '@mui/material';
import { LeafIcon,HboIcon,} from '../componets/icons';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import AspectRatio from '@mui/joy/AspectRatio';
import { useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import TimeAndWeather from '../componets/TimeAndWeather';
import ChannelsNav from '../componets/Channels';
import { useNavigate } from 'react-router-dom';
import Img from '../assets/ava.png';
import LgTypeCard from '../componets/LgTypeCard';

import SportsBaseballIcon from "@mui/icons-material/SportsBaseball"
import TheatersIcon from '@mui/icons-material/Theaters';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import TvIcon from '@mui/icons-material/Tv';
 const data = [
  {
    icon: < PodcastsIcon sx={{fontSize:50}}  />,
    title: "Live tv",
    description: "4.21M views",
  },
  {
    icon: <TheatersIcon sx={{fontSize:50}} />,
    title: "Movies",
    description: "4.74M views",
  },
  {

    title: "Sport",
    description: "3.98M views",
    icon: <SportsBaseballIcon sx={{fontSize:50}} />,
  },
  {
    icon: <TvIcon sx={{fontSize:50}} />,
    title: "Tv Show",
    description: "4.74M views",
    new: true,
  },
]



function Home() {
  const isXS = useMediaQuery('(max-width:600px)')
  const navigate = useNavigate();
  return (
    <Box sx={{ height: '100vh',backgroundColor: '#0E0E30' }}>
      <CssBaseline />
      <Grid container sx={{ height: '100%', width:'100%' }}>
        <Grid
          item
          xs={12}
          sm={9}
          sx={{
            backgroundColor: '#0E0E30',
            order: { xs: 1, sm: 4 },
            height: {xs:'50%',sm:'100%'},
            position: 'relative',
          }}
        >
     <Card  sx={{ height:{xs:'100%',sm:'80%'},width:'100%',border:'none', borderRadius:'0', position:'relative' }}>
      <CardCover>
        <img
          src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
          srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(344deg, rgba(0,0,0,0) 15%, rgba(14,14,48,1) 85%), linear-gradient(160deg, rgba(0,0,0,0) 50%, rgba(14,14,48,1) 80%)',
        }}
      />
      <CardContent sx={{  }}>
      

    <Box  color={'white'} height={'100%'}  >
    <Stack  direction={'row'} position={'relative'} >
       {
        isXS &&  <Stack >
        <LeafIcon size={30} />
          </Stack>
       }
      <Stack spacing={3} top={1} right={1} position={'absolute'} direction={'row'} alignItems={'center'}>
        <TimeAndWeather/>
       <Avatar sx={{backdropFilter: 'blur(3px)',backgroundColor: 'rgba(25, 26, 56, 0.5)'}}> <SearchIcon/></Avatar>
        {!isXS &&  <Avatar alt="Remy Sharp" src={Img} />}
      </Stack>
      </Stack>
      <Stack pt={{xs:5, sm:0}}  ><HboIcon  size={isXS?40:50}/></Stack>
      <Typography variant='subtitle2' fontWeight='bolder' >Now Playing</Typography>
      <Typography variant='h6' fontWeight='bold' >Greys Anatomy</Typography>
      <Typography variant='body2' maxWidth={'300px'} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta pariatur neque, totam laboriosam obcaecati natus quas tenetur corporis illo eaque sit quaerat ad cumque .</Typography>
      <Stack spacing={1} direction='row'  alignItems={'center'}  >
       <Stack direction='column' spacing={0} pt={2} >
       <Stack sx={{borderRadius:'5px'}} width={'200px'} height={'5px'} bgcolor={'gray'} direction='row' spacing={1} alignItems='center'>
        <Stack sx={{borderRadius:'5px'}} width={'50%'} height={'5px'} bgcolor={'white'} direction='row' spacing={1} alignItems='center'>
          </Stack>
          </Stack>
          <Stack width={'200px'}  direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='body2' >00:00</Typography>
            <Typography variant='body2' >1:00:00</Typography>
            </Stack>
            </Stack>

          <Stack   direction='column' alignItems={'center'}  >
          <PlayCircleIcon fontSize='large'/>
          </Stack>
      </Stack>
    </Box>
    <LgTypeCard data={data}/>
      </CardContent>
    </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            backgroundColor: '#0E0E30',
            order: { xs: 2, sm: 2 },
            height: {xs:'18%',sm:'100%'},
          }}
        >
          <ChannelsNav/>
        </Grid>
        {isXS &&  <Grid
          component={Grid}
          item
        height={'30%'}
          xs={12}
          sx={{
            backgroundColor: '#0E0E30',
            order: { xs: 3 }
          }}>
            <Box 
    sx={{
      width: '100%',
      gap: 6,
      alignItems: 'center',
      overflow: 'auto',
      display: 'flex' ,
      scrollSnapType: 'x mandatory',
      '& > *': {
        scrollSnapAlign: 'center',
      },
      '::-webkit-scrollbar': { display: 'none' },
    }}
  >
    
    {data.map((item) => (
      <Card    size="large" key={item.title} sx={{  borderRadius:'3px',  backdropFilter: 'blur(3px)',backgroundColor: 'rgba(25, 26, 56, 0.9)',height:item.current ? '100%' :'90%' ,border:'solid 1px #0F102D',p:1,position:'relative',}}>
        <AspectRatio   ratio={1.5 } sx={{ minWidth: 85 }}>
          <Box component={'div'}  color={'white'} sx={{cursor:'pointer'}}  bgcolor={'#0F102D'}  onClick={()=>navigate('/detail')}>
         {item.icon}
          </Box>
        </AspectRatio>
        <Box  color={'white'} sx={{ whiteSpace: 'nowrap', mx: 1,cursor:'pointer' }} component={'div'} onClick={navigate('/detail')}>
          <Typography variant={'subtitle1'}  >{item.title}</Typography>
          <Typography variant='subtitle2'>{item.description}</Typography>
        </Box>
       {
        item.current &&   <Box width={'30%'} height={'10px'} sx={{position:'absolute'}} bottom={-9} left={'33%'} bgcolor={'white' } >
        </Box>
       }
      </Card>
    ))}
  </Box>
        </Grid>
          }
      </Grid>
    </Box>
  );
}

export default Home;
