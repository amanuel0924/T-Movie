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
import { baseURL } from "../../socket";
import Loader from "../../componets/Loader";

const Overview = () => {
  const { data:channel,fetchData:fechChannel,loading:chloading } = useCRUD(`${baseURL}/api/channel`);
  const { data:movie,fetchData:fechMovie,loading:moloading } = useCRUD(`${baseURL}/api/movie`);
  const { data:catagoreycount,fetchData:fechcat,loading } = useCRUD(`${baseURL}/api/movie/grouped`);
  const { data:typecount,fetchData:fechtype,loading:typeloading } = useCRUD(`${baseURL}/api/movie/type`);
  
 console.log(typecount)
 console.log(catagoreycount)

  const refechaData = useCallback(() => {
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
     {chloading?<Loader/>:( <Box sx={{ display: 'flex', flexDirection: 'column' ,width:'100%',}}>
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
      </Box>)}
    </Card>
    <Card elevation={5} sx={{ display: 'flex',minWidth: 270 }}>
      {
        moloading?<Loader/>:(<Box sx={{ display: 'flex', flexDirection: 'column' ,width:'100%',}}>
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
      </Box>)
      }
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
         loading?<Loader/>: <Stack>
        <MyPieChart data={catagoreycount }/>
      </Stack>
      }
 {
      typeloading?<Loader/>:  <Stack>
      <ProgramLineChart data={typecount}/>
            </Stack>
     }

   </Paper>
  )
}

export default Overview