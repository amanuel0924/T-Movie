import  { useState} from "react"
import {  Box, Paper,Modal,Typography, TextField, Button, Stack  } from "@mui/material"
import PagesHeader from "../../componets/PagesHeader"


const style = {
  position: 'absolute',
  top: '38%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  p: 2,

};

const Program = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Paper sx={{padding:2}}  >
    <Box sx={{borderBottom:' solid 1px',}}>
      <PagesHeader openModal={handleOpen} />
    </Box>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{textAlign:'center', fontWeight:'600'}} variant="h4" component="h4">
            Add Program
          </Typography>
        <Box sx={{display:'flex' ,justifyContent:'center',gap:'20px',padding:'20px'}}>
       <Stack spacing={2} direction='column' >
       <TextField    sx={{marginTop:2, }}  label="Name" variant={'filled'} size={'small'}  />
       <TextField    sx={{marginTop:2, }}  label="Name" variant={'filled'} size={'small'}  />
       <TextField    sx={{marginTop:2, }}  label="Name" variant={'filled'} size={'small'}  />
       </Stack>
       <Stack spacing={2} direction='column' >
       <TextField    sx={{marginTop:2, }}  label="Name" variant={'filled'} size={'small'}  />
       <TextField    sx={{marginTop:2, }}  label="Name" variant={'filled'} size={'small'}  />
       <TextField    sx={{marginTop:2, }}  label="Name" variant={'filled'} size={'small'}  />
       </Stack>
        </Box>
        <Box sx={{display:'flex' ,justifyContent:'center',gap:'20px',padding:'20px'}}>
        <Button color={'inherit'} onClick={handleClose}  variant={'outlined'}>Cancel</Button>
       <Button color={'inherit'}  sx={{color:'white',bgcolor:'#181A41' , '&:hover':{bgcolor:'#181A41',opacity:'0.9'}}} variant={'contained'}>Add</Button>
        </Box>
        </Box>
      </Modal>
   </Paper>
  )
}

export default Program