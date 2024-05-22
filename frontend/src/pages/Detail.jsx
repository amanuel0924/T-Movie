import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Box, Stack, Typography, Button} from '@mui/material';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import { useMediaQuery } from '@mui/material';
import SideNav from '../componets/SideNav';
import TimeAndWeather from '../componets/TimeAndWeather';
import {  ChevronIcon } from '../componets/icons';
import { MySearchIcon } from '../componets/icons';
import { Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const movies = [
  {
    title: "California",
    duration: "2h 22m",
    isNew: true,
    isActive: true
  },
  {
    title: "New York",
    duration: "1h 45m",
    isNew: true,
    isActive: false
  },
  {
    title: "Texas",
    duration: "3h 15m",
    isNew: false,
    isActive: false
  },
  {
    title: "Texas",
    duration: "3h 15m",
    isNew: false,
    isActive: false
  },
  {
    title: "Texas",
    duration: "3h 15m",
    isNew: false,
    isActive: false
  },
 
];


function ResponsiveGrid() {
  const isXS = useMediaQuery('(max-width:600px)')
  return (
    <Box   sx={{ height: '100vh',backgroundColor: '#0E0E30', overflow:'auto' }}>
      <CssBaseline />
      <Grid  container sx={{ height: '100%',backgroundColor: '#0E0E30' , }}>
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
            <MySearchIcon/>
              <Avatar sx={{ bgcolor: 'purple', }}>OP</Avatar>
              </Stack>
              </Stack>
            </Stack>
            <Box
            
            height={{xs:'90%',sm:'80%'}}
            >
              <Stack height={'3%'}    px={isXS?2:5}>
              <Stack spacing={3} direction={'row'}  sx={!isXS?{borderBottom:'solid 2px #8282ad'}:{}}>
              <Typography variant={'subtitle2'} sx={{color:'white'}}>Popular</Typography>
                <Typography variant={'subtitle2'} sx={{color:'white'}}>New</Typography>
                <Typography variant={'subtitle2'} sx={{color:'white'}}>Trending</Typography>
              </Stack>
              </Stack>
           
              <Box 
                sx={{
                   width: '100%',
                   height:'100%',
                   gap: 3,
                   px:{xs:2,sm:5},
                   pb:{xs:4,sm:0},
                   margin: 0,
                   alignItems: 'center',
                   overflowX: 'auto',
                   overflowY: 'hidden',
                   display: 'flex' ,
                   flexDirection: isXS?'column':'row',
                   '::-webkit-scrollbar': { display: 'none' },
                 }}
              >
              {movies.map((item,index)=>{
                return(
                  <Card key={index}  sx={{ minHeight: {xs:'200px' ,sm:'350px'},  minWidth: '240px', width: {xs:'100%' ,sm:'240px'},border:'none',position:'relative'}}>
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
                        `linear-gradient(${isXS?'90':'180'}deg, rgba(0,0,0,0.6) 0%, rgba(14,14,48,1) 80%)`,
                        border:'1px solid',borderRadius:{xs:'10px',sm:'5px'}
                        
                    }}
                  />
                  <CardContent   sx={{ justifyContent: 'flex-end',flexDirection:{xs:'row',sm:'column'},position:'relative' }}>
                   <Grid container>
                  <Grid item xs={8} sm={12} >
                  <Stack height={'100%'} p={{xs:3,sm:0}} spacing={{xs:2,sm:2}} justifyContent={'center'}>
                {item.isNew &&   <Button  variant="contained"   sx={{fontSize:12,height:{sm:25},width:25,backgroundColor:'orangered',color:'white',borderRadius:'5px'}}>New</Button>}
                  <Typography
                     color={'white'}
                      variant='h5'
                    >
                      {item.title}
                    </Typography>
                  </Stack>
                    </Grid>
                   
                   
                  <Grid item xs={4} sm={12}>
                  <Stack spacing={0.5}   height={'100%'} alignItems={'end'} pt={1}  justifyContent={{xs:'center',sm:'start'}} direction={{xs:'column',sm:'row',}}>
                    <PlayCircleOutlineIcon  fontSize='medium' sx={{color:'white',}}/>
                    <AccessTimeIcon  fontSize='medium' sx={{color:'white'}}/>
                    <FavoriteBorderIcon  fontSize='medium' sx={{color:'white'}}/>
                   </Stack>
                    </Grid>
                   </Grid>
                   <Typography  variant={'caption'} sx={{color:'white',position:'absolute', top:0.5, right:1}}>2h 22m</Typography>
                  </CardContent>
                  {
                    item.isActive && <Box
                    height={'8px'}
                    width={'90px'}
                    bgcolor={'white'}
                    sx={{
                      position: 'absolute',
                      bottom: -8,
                      left:'35%' ,
                      boxShadow: '0px 5px 10px 1px  white', 
                    }}
                  />
                  }
                </Card>
                )
               }
                
               )}
              </Box>
              
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
      </Grid>
    </Box>
  );
}

export default ResponsiveGrid;
