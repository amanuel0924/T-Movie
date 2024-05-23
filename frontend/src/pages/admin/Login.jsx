import { useState,useEffect } from "react";
import { Box, Stack, Typography,TextField,Button } from "@mui/material"
import { LeafIcon } from '../../componets/icons';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';  
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setCredentials } from "../../redux/authSlice";





const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const dispatch = useDispatch();
const { user} = useSelector((state) => state.auth)


useEffect(() => {
    if(user){
        navigate('/admin')
    }
}, [user,navigate])


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
          axios.defaults.withCredentials = true;
        const response = await axios.post('http://localhost:4000/auth/login', {
            email,
            password
        })

        console.log(response.data);
        dispatch(setCredentials({ ...response}))
        navigate('/admin');
}
catch (error) {
    console.error(error);
}
}

  return (
    <Stack height={'100vh'} width={'100%'}  direction={'row'}>
        <CssBaseline />
        <Stack height={'100%'}  width={'50%'} bgcolor={'#000000'}>
            <Stack spacing={4} sx={{justifyContent:'center',alignItems:'center',height:'100%'}}>
                <LeafIcon size={200} />
                <Typography variant={'h1'} sx={{color:'lightgray',fontWeight:'600'}}>T-Movie</Typography>
            </Stack>


        </Stack>
        <Stack width={'50%'} alignItems={'center'}>
            <Stack spacing={4} sx={{justifyContent:'center',alignItems:'center',height:'100%'}}>
                <Typography variant={'h2'}>Login</Typography>
                <Box component="form"  onSubmit={handleSubmit} sx={{width:'full'}}>
                   
                <TextField
                margin="normal"
                required
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              </Box>

            </Stack>
            
        </Stack>
    </Stack>
  )
}

export default Login