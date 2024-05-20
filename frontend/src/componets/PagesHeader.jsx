import PropTypes from 'prop-types';
import { Box , Grid,TextField,Button } from "@mui/material"
import IosShareIcon from '@mui/icons-material/IosShare';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';


const PagesHeader = (props) => {

  return (
    <Grid container  spacing={2} sx={{padding:2}}>
    <Grid item xs={8}>
      <Box sx={{bgcolor:'#e0e0e0',display:'flex',alignItems:'center',padding:'0 10px',}} >
                <SearchIcon fontSize={'medium'} sx={{ color: 'text.secondary' }}  /> 
                <TextField  sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },
            
          },width: '100%'}} id="outlined-basic" placeholder="Search" variant="outlined" size="small" />
      </Box>
    </Grid>
    <Grid item xs={4}>
    <Button  sx={{color:'#181A41'}} variant="text" startIcon={<IosShareIcon />}>
    Export
  </Button>
  <Button  sx={{color:'#181A41'}} variant="text" startIcon={<FilterListIcon />}>
    Add Filter
  </Button>
    <Button  onClick={()=>props.openModal()} sx={{color:'white',bgcolor:'#181A41'}} variant={'contained'}>Text</Button>
    </Grid>
  </Grid>
  )
}
PagesHeader.propTypes = {
    openModal: PropTypes.func.isRequired,
  };

export default PagesHeader