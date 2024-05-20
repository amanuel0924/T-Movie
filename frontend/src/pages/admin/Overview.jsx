import {  Box, Paper } from "@mui/material"
import PagesHeader from "../../componets/PagesHeader"
const Overview = () => {
  return (
    <Paper sx={{padding:2}}  >
    <Box sx={{borderBottom:' solid 1px',}}>
      <PagesHeader />
    </Box>
   </Paper>
  )
}

export default Overview