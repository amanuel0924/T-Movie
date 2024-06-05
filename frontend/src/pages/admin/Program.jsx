import  { useState,useEffect,useCallback} from "react"
import {  Box, Paper,Modal,Typography, TextField, Button, Stack} from "@mui/material"
import PagesHeader from "../../componets/PagesHeader"
import {useCRUD} from './../../services/channelServiec'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import socket from "../../socket";
import { toast } from "react-toastify";
import Loader from '../../componets/Loader';
// import ProgramTable from "../../componets/programTable";
// import Paginate from "../../componets/Pagination";
// import { useParams } from "react-router-dom";
import { baseURL } from "../../socket";
import ProTable from "../../componets/ProgramTable3";

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
  // const { pageNumber, keyword } = useParams()
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

 
  const[filterOpen,setFilterOpen]=useState(false)


  const handleClose = () => {
    setOpen(false)
    setId('')
    setTitle('')
    setChannel('')
    setType('')
    setCategory('')
    setVideoUrl('')
    setDuration('')
    setDeleteId('')
    setDescription('')
  };
  const handleFilterModalClose=()=>{
    setFilterOpen(false)
  }
 
  const handleOpen = () => setOpen(true);
  const handleFilterOpen = () => setFilterOpen(true);
  
  // const { data,fetchData,loading } = useCRUD(`${baseURL}/api/movie?pageNumber=${pageNumber||1}&keyword=${keyword||''}&type=${type || ""}&category=${category || ""}&channel=${channel || ""}`);
  const { updateData,createData,deleteData,loading} = useCRUD(`${baseURL}/api/movie`);
  const { data: types,fetchData:fechtype} = useCRUD(`${baseURL}/api/typeandcategory/types`);
  const { data: categorys,fetchData:fechCat} = useCRUD(`${baseURL}/api/typeandcategory/categories`);
  const { data: channels,fetchData:fechChannel} = useCRUD(`${baseURL}/api/channel`);



  

  const handleCreate = async () => {
    if (!title || !channel || !type || !category || !videoUrl || !duration||!description) {
      toast.error("please fill all input")
    } else {
      try {
        await createData({  title, channelId:+channel, typeId:+type, categoryId:category, videoUrl,duration :Number(duration) ,description},'datachange')
        handleClose();
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }
  };

  const handleUpdate = async () => {
    if (!title || !channel || !type || !category || !videoUrl || !duration||!description) {
      toast.error("please fill all input")
    } else {
      try {
        await updateData(id, { title, channelId:+channel, typeId:+type, categoryId:category, videoUrl,duration :Number(duration) ,description},'datachange')
        handleClose();
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }
  };



  const handleDelete = async () => { 
    try {
      await deleteData(deleteId,'datachange')
      handleClose();
    } catch (error) {
      toast.error(error?.data?.message || error.message)
    }
  }


  const cliearFilter=()=>{
    setChannel('')
    setCategory('')
    setType('')
    handleFilterModalClose()
  }

  const fetchAll = useCallback(() => {
    // fetchData();
    fechtype();
    fechCat();
    fechChannel();
  }, [fechtype,fechCat,fechChannel]);

  useEffect(() => {
    socket.on('onDataChange',fetchAll );
  }, [fetchAll]);
  return (
    <Paper sx={{padding:2}}  >
    <Box sx={{borderBottom:' solid 1px',}}>
      <PagesHeader openModal={handleOpen} />
      <ProTable   openModal={handleOpen} setId={setId}  setTitle={setTitle} setChannel={setChannel} setCategory={setCategory} setType={setType} setVideoUrl={setVideoUrl} setDuration={setDuration} setDeleteId={setDeleteId} setDescription={setDescription} />
    {/* <Paginate page={data.page} total={data.pages}  />   */}
    </Box>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" sx={{textAlign:'center', fontWeight:'600'}} variant="h4" component="h4">
            {deleteId?'Are you sure delete':id?'Edit':'Add'} Program
          </Typography>
        {!deleteId&&<Box sx={{display:'flex' ,justifyContent:'center',gap:'20px',padding:'20px'}}>
       <Stack spacing={2} direction='column' >
       <TextField    sx={{marginTop:2, }}  label="Video URL" variant={'filled'} size={'small'}  value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <TextField    sx={{marginTop:2, }}  label="Description" variant={'filled'} size={'small'}  value={description} onChange={(e) => setDescription(e.target.value)} />
       <TextField    sx={{marginTop:2, }} type="number"  label="Duration" variant={'filled'} size={'small'}  value={duration} onChange={(e) => setDuration(e.target.value)} />
       <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label-chnnel">Channel</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small-chneel"
        value={channel}
        label=" Channel"
        onChange={ (e) => setChannel(e.target.value)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
       {
          channels?.map((channel) => (
            <MenuItem key={channel.id} value={channel.id}>{channel.name}</MenuItem>
          ))
       }
        
      </Select>
    </FormControl>
       </Stack>
       <Stack spacing={2} direction='column' >
       <TextField    sx={{marginTop:2, }}  label="Title" variant={'filled'} size={'small'}  value={title} onChange={(e) => setTitle(e.target.value)} />
       <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label-chnnel-Category">Category</InputLabel>
      <Select
        labelId="demo-select-small-label-Category"
        id="demo-select-small-chneel-Category"
        value={category}
        label=" Category"
        onChange={ (e) => setCategory(e.target.value)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
       {
          categorys?.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
          ))
       }
        
      </Select>
    </FormControl>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label-chnnel-type">Type</InputLabel>
      <Select
        labelId="demo-select-small-label-type"
        id="demo-select-small-chneel-type"
        value={type}
        label=" Type"
        onChange={ (e) => setType(e.target.value)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
       {
          types?.map((type) => (
            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
          ))
       }
        
      </Select>
    </FormControl>
       </Stack>
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

     

   </Paper>
  )
}

export default Program