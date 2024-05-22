import {  Stack, Typography } from '@mui/material'

import {WetherIcon} from './icons'


const TimeAndWeather = (prop) => {
  
  return (
    <Stack spacing={1} direction={'row'}>
      <WetherIcon  />
      <Typography variant='subtitle2' fontWeight={'thin'} >24°</Typography>
    <Typography variant='subtitle2' fontWeight={'thin'} >11:00PM</Typography>
  {prop.children}
  </Stack>
  )
}

export default TimeAndWeather