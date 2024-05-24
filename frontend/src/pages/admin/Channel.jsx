import  { useState,useEffect} from "react"
import {  Box, Paper,Modal,Typography, TextField, Button  } from "@mui/material"
import PagesHeader from "../../componets/PagesHeader"


import Loader from '../../componets/Loader';

import ChannelTable from "../../componets/ChannelTable";


import socket from '../../socket';
import { toast } from "react-toastify";
import {useCRUD} from './../../services/channelServiec'
import { useParams } from "react-router-dom";

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


const Channel = () => {
  const [name, setname] = useState('');
  const {keyword} = useParams()
  const [id, setId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setId('')
    setname('')
    setDeleteId('')
  }

const API_URL = `/api/channel${keyword?`?keyword=${keyword}`:''}`
const { data: channel,fetchData,createData,loading,updateData,deleteData } = useCRUD(API_URL);
  const handleCreate = async () => {
    if (!name) {
      toast.error("please fill all input")
    } else {
      try {
        await createData({ name },'datachange')
        setname('');
        handleClose();
        toast.success("channel created succesfully")
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }
  };

  const handleUpdate = async () => {
    if (!name) {
      toast.error("please fill all input")
    } else {
      try {
        await updateData(id, { name },'datachange')
        setname('');
        setId('')
        handleClose();
        toast.success("channel updated succesfully")
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }
  };



  




  const handleDelete = async () => { 
    try {
      await deleteData(deleteId,'datachange')
      setDeleteId('')
      handleClose();
      toast.success("channel deleted succesfully")
    } catch (error) {
      toast.error(error?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchData();
    socket.on('onDataChange',fetchData)
  }, [fetchData]);
  return (
    <Paper sx={{padding:2}}  >
    <Box sx={{borderBottom:' solid 1px'}}>
      <PagesHeader openModal={handleOpen}  />
   
<ChannelTable data={channel} openModal={handleOpen} setName={setname} setId={setId} setDeleteId={setDeleteId}   />
    </Box>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{textAlign:'center', fontWeight:'600'}} variant="h4" component="h4">
            {deleteId?'are you sure Delete':id?'Edit':'Add'} Channel
          </Typography>
       {!deleteId&&  <Box sx={{display:'flex' ,justifyContent:'center'}}>
        <TextField   sx={{marginTop:2, }}  label="Name" variant={'filled'} size={'small'} value={name}  onChange={(e) => setname(e.target.value)} />
        </Box>}
        <Box sx={{display:'flex' ,justifyContent:'center',gap:'20px',padding:'20px'}}>
        <Button onClick={handleClose}  variant={'outlined'}>Cancel</Button>
       {!id&&!deleteId&&<Button  sx={{color:'white',bgcolor:'#181A41'}} variant={'contained'} onClick={handleCreate}>{loading? <Loader/>:'Create'
       }</Button>}
       {id&&<Button  sx={{color:'white',bgcolor:'#181A41'}} variant={'contained'}  onClick={handleUpdate}>{loading? <Loader/>:'Update'}</Button>}
       {deleteId&&<Button  sx={{color:'white',bgcolor:'#181A41'}} variant={'contained'}  onClick={handleDelete}>{loading? <Loader/>:'Delete'}</Button>}
        </Box>
        </Box>
      </Modal>
   </Paper>)
}


export default Channel