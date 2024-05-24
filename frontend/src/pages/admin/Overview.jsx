import {  Avatar, Box, Paper, Stack } from "@mui/material"
import PagesHeader from "../../componets/PagesHeader"
import Card from '@mui/material/Card';
import { useEffect ,useCallback} from "react";

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useCRUD from "../../services/channelServiec";
import socket from "../../socket";
import MyPieChart from "../../componets/Pichart";
import ProgramLineChart from "../../componets/LIneChart";

const Overview = () => {
  const { data:channel,fetchData:fechChannel } = useCRUD("http://localhost:4000/api/channel");
  const { data:movie,fetchData:fechMovie } = useCRUD("http://localhost:4000/api/movie");
  const { data:catagoreycount,fetchData:fechcat } = useCRUD("http://localhost:4000/api/movie/grouped");
  const { data:typecount,fetchData:fechtype } = useCRUD("http://localhost:4000/api/movie/type");
  
 

  const refechaData = useCallback(() => {
    console.log('lllllllllllllllllll')
    fechChannel();
    fechMovie();
    fechtype();
    fechcat();
  }, [fechChannel, fechMovie, fechcat, fechtype]);
  
  useEffect(() => {
    socket.on('onDataChange', refechaData)
 
  }
  , [refechaData])


  return (
    <Paper sx={{padding:2 ,display:"flex", flexDirection:'column'}}  >
    <Box justifyContent={"center"} sx={{borderBottom:' solid 1px',marginBottom:4}}>
      <PagesHeader />
    </Box>
    <Stack justifyContent={'space-between'} spacing={2} direction="row" width={'100%'} >
     <Card elevation={5} sx={{ display: 'flex',minWidth: 270 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' ,width:'100%',}}>
        <CardContent sx={{ display:'flex',flexDirection:'row',justifyContent:'space-between' }}>
          <Typography component="div" variant="h6" >
           Channel
          </Typography>
          <Avatar   variant='rounded' sx={{bgcolor: '#161638',width: 35, mt:1, height: 35}}  ></Avatar>
        </CardContent>
        <Box sx={{ display: 'flex', flexDirection:'column',alignItems: 'start', pl: 2, pb: 1 }}>
        <Typography variant="subtitle1" color="text.secondary" component="div">
            {channel?.length}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          12+ ths Month
          </Typography>
        </Box>
      </Box>
    </Card>
    <Card elevation={5} sx={{ display: 'flex',minWidth: 270 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' ,width:'100%',}}>
        <CardContent sx={{ display:'flex',flexDirection:'row',justifyContent:'space-between' }}>
          <Typography component="div" variant="h6" >
           Program
          </Typography>
          <Avatar   variant='rounded' sx={{bgcolor: '#161638',width: 35, mt:1, height: 35}}  ></Avatar>
        </CardContent>
        <Box sx={{ display: 'flex', flexDirection:'column',alignItems: 'start', pl: 2, pb: 1 }}>
        <Typography variant="subtitle1" color="text.secondary" component="div">
            {movie?.tolalMovies}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          12+ ths Month
          </Typography>
        </Box>
      </Box>
    </Card>
    <Card elevation={5} sx={{ display: 'flex',minWidth: 270 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' ,width:'100%',}}>
        <CardContent sx={{ display:'flex',flexDirection:'row',justifyContent:'space-between' }}>
          <Typography component="div" variant="h6" >
           System users
          </Typography>
          <Avatar   variant='rounded' sx={{bgcolor: '#161638',width: 35, mt:1, height: 35}}  ></Avatar>
        </CardContent>
        <Box sx={{ display: 'flex', flexDirection:'column',alignItems: 'start', pl: 2, pb: 1 }}>
        <Typography variant="subtitle1" color="text.secondary" component="div">
            37
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          12+ ths Month
          </Typography>
        </Box>
      </Box>
    </Card>
      </Stack>

      {
        catagoreycount && <Stack>
        <MyPieChart data={catagoreycount }/>
      </Stack>
      }
 {
      typecount &&  <Stack>
      <ProgramLineChart data={typecount}/>
            </Stack>
     }

   </Paper>
  )
}

export default Overview