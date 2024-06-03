import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react'; 
import {  Box, Stack, Typography} from '@mui/material';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import { useMediaQuery } from '@mui/material';
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
import Img from '../assets/ava.png';





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
       
         <Card  sx={{ height:'100%',width:'100%',border:'none', borderRadius:'0' }}>
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
      <CardContent>
    <Stack   height={'100%'} width={'100%'}>
            <Stack
            direction={'column'}
            height={{xs:'20%',sm:'25%'}}
            pt={{xs:2,sm:7}}
            >
            <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack px={{xs:0,sm:5}} spacing={2} direction={'row'} alignItems={'center'} >
             {isXS && <Box sx={{cursor:'pointer'}}  onClick={()=>navigate('/')} component={'div'}><ChevronIcon  size={35}  /></Box>}
             <Box component={'div'} onClick={()=>navigate('/detail')} sx={{cursor:'pointer'}}>
             <Typography   variant={isXS?'h6':'h5'} sx={{color:'white'}}>Movies</Typography>
             </Box>
             </Stack>
              <Stack color={'white'} spacing={3} direction={'row'} alignItems={'center'}>
              {!isXS &&  <TimeAndWeather>
                <Typography variant={'subtitle2'} sx={{color:'white',textAlign:'center',display:{sm:'none',md:'inline-block'}}}>Thuesday,Apr 4</Typography>
               </TimeAndWeather>}
              <Stack direction={'row'} pr={5} alignItems={'center'} spacing={2}>
              <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
              <Avatar alt="Remy Sharp" src={Img} />
              </Stack>
              </Stack>
            </Stack>
          <Stack height={'3%'}    px={isXS?2:5}>
              <Stack spacing={3} direction={'row'} position={'relative'}  sx={!isXS?{borderBottom:'solid 2px #8282ad'}:{}}>
                <Box component={'div'} sx={{ position: 'relative', cursor:'pointer',
      '&:hover .hoverBox': {
        display: 'block',
      }}} onClick={()=>handleCatagory('popular')}>
         <Typography variant={'subtitle1'} sx={{color:'white'}}>Popular</Typography>
         <ActiveBox hight={'4px'} width={'40px'} shadow={true} bottom={-7} left={'20%'} isActive={location.pathname === '/detail/popular'}/>
      </Box>
      <Box component={'div'} sx={{ position: 'relative',cursor:'pointer',
      '&:hover .hoverBox': {
        display: 'block',
      }}} onClick={()=>handleCatagory('recommended')}>
         <Typography variant={'subtitle1'} sx={{color:'white'}}>Recommended</Typography>
         <ActiveBox hight={'3px'} width={'40px'} shadow={true} bottom={-7} left={'20%'} isActive={location.pathname === '/detail/recommended'}/>
      </Box>
      <Box component={'div'} sx={{ position: 'relative',cursor:'pointer',
      '&:hover .hoverBox': {
        display: 'block',
        
      }}} onClick={()=>handleCatagory('featured')}>
         <Typography variant={'subtitle1'} sx={{color:'white'}}>Featured</Typography>
         <ActiveBox hight={'3px'} width={'40px'} shadow={true} bottom={-7} left={'20%'} isActive={location.pathname === '/detail/featured'}/>
      </Box>
              </Stack>
              </Stack>
            </Stack>
            {loading ? <Loader/> : error ? <Typography variant='h4' color='error'>{'some thing wrong'}</Typography> : (    <Stack
           pt={2} height={{xs:'85%',sm:'75%'}}
            >
              <MovieCards movies={filteredMovies} />
            </Stack>)}
          </Stack>
      </CardContent>
    </Card>  
    </Box>
  );
}

export default Detail
