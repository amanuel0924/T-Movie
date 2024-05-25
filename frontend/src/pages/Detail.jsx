import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react'; 
import { Grid, Box, Stack, Typography} from '@mui/material';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import { useMediaQuery } from '@mui/material';
import SideNav from '../componets/SideNav';
import TimeAndWeather from '../componets/TimeAndWeather';
import {  ChevronIcon } from '../componets/icons';
import { Avatar } from '@mui/material';
import useCRUD from "../../src/services/channelServiec";
import { baseURL } from '../socket';
import { useEffect } from 'react';
import socket from '../socket';
import MovieCards from '../componets/MovieCards';
import SearchComponent from '../componets/SearchConponet';
import ActiveBox from '../componets/ActiveBox';
import Loader from '../componets/Loader';
import { useNavigate ,useParams,useLocation} from 'react-router-dom';





function Detail() {
  const { category } = useParams()
  const categoryMap = {
    popular: '2',
    recommended: '1',
    featured: '3',
  };
  
  const categoryParam = categoryMap[category] || '';
  const url = `${baseURL}/api/movie?category=${categoryParam}`;
  const { data,fetchData,loading,error } = useCRUD(url);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState (data?.movies);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    socket.on('onDataChange', fetchData)
    setMovies(data?.movies);
  }, [data, fetchData]);

  const filteredMovies = movies?.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCatagory = (cat) => {
    navigate(`/detail/${cat}`)
  }


  const isXS = useMediaQuery('(max-width:600px)')
  return (
    <Box   sx={{ height: '100vh',backgroundColor: '#0E0E30', overflow:'auto' }}>
      <CssBaseline />
     {
        loading ? <Loader/> : error ? <Typography variant='h4' color='error'>{error}</Typography> : ( <Grid  container sx={{ height: '100%',backgroundColor: '#0E0E30' , }}>
        <Grid
          item
          xs={12}
          sm={10}
          sx={{
            order: { xs: 1, sm: 4 },
            height: '100%',
            position: 'relative',
          }}
        >
         <Card  sx={{ height:{xs:'100%',sm:'100%'},width:'100%',border:'none', borderRadius:'0' }}>
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
            'radial-gradient(circle, rgba(182,174,238,0.2) 0%, rgba(14,14,48,0.98) 0%)',
        }}
      />
      <CardContent sx={{  }}>
      <Stack  height={'100%'}>
            <Stack
            direction={'row'}
            py={{xs:2,sm:2}}
            px={{xs:2,sm:5}}
            justifyContent={'space-between'}
            alignItems={'end'}
            height={{xs:'10%',sm:'20%'}}
            >
             <Stack spacing={2} direction={'row'} alignItems={'center'} >
             {isXS && <ChevronIcon  size={35}  />}
              <Typography  variant={isXS?'h6':'h5'} sx={{color:'white'}}>Movies</Typography>
             </Stack>
              <Stack color={'white'} spacing={3} direction={'row'} alignItems={'center'}>
              {!isXS &&  <TimeAndWeather>
                <Typography variant={'subtitle2'} sx={{color:'white',textAlign:'center',display:{sm:'none',md:'inline-block'}}}>Thuesday,Apr 4</Typography>
               </TimeAndWeather>}
              <Stack direction={'row'} spacing={2}>
              <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
              <Avatar sx={{ bgcolor: 'purple', }}>OP</Avatar>
              </Stack>
              </Stack>
            </Stack>
            <Box
            
            height={{xs:'90%',sm:'80%'}}
            >
              <Stack height={'3%'}    px={isXS?2:5}>
              <Stack spacing={3} direction={'row'} position={'relative'}  sx={!isXS?{borderBottom:'solid 2px #8282ad'}:{}}>
                <Box component={'div'} sx={{ position: 'relative',
      '&:hover .hoverBox': {
        display: 'block',
        cursor:'pointer'
      }}} onClick={()=>handleCatagory('popular')}>
         <Typography variant={'subtitle1'} sx={{color:'white'}}>Popular</Typography>
         <ActiveBox hight={'2px'} width={'40px'} shadow={true} bottom={-7} left={'20%'} isActive={location.pathname === '/detail/popular'}/>
      </Box>
      <Box component={'div'} sx={{ position: 'relative',
        
      '&:hover .hoverBox': {
        display: 'block',
        cursor:'pointer'
      }}} onClick={()=>handleCatagory('recommended')}>
         <Typography variant={'subtitle1'} sx={{color:'white'}}>Recommended</Typography>
         <ActiveBox hight={'2px'} width={'40px'} shadow={true} bottom={-7} left={'20%'} isActive={location.pathname === '/detail/recommended'}/>
      </Box>
      <Box component={'div'} sx={{ position: 'relative',
      '&:hover .hoverBox': {
        display: 'block',
        cursor:'pointer'
      }}} onClick={()=>handleCatagory('featured')}>
         <Typography variant={'subtitle1'} sx={{color:'white'}}>Featured</Typography>
         <ActiveBox hight={'2px'} width={'40px'} shadow={true} bottom={-7} left={'20%'} isActive={location.pathname === '/detail/featured'}/>
      </Box>
              </Stack>
              </Stack>
              <MovieCards movies={filteredMovies} />
            </Box>
          </Stack>
      </CardContent>
     
    </Card>  
        </Grid>
       {!isXS &&  <Grid
          item
          sm={2}
          pr={4}
          sx={{
            backgroundColor: '#0E0E30',
            order: { xs: 4, sm: 1 },
            height: {xs:'50%',sm:'100%'}
          }}
        >
          <SideNav/>
        </Grid>}
      </Grid>)}
    </Box>
  );
}

export default Detail
