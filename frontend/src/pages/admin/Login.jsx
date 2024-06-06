import { useState,useEffect } from "react";
import { Box, Stack, Typography,TextField,Button } from "@mui/material"
import { LeafIcon } from '../../componets/icons';
import CssBaseline from '@mui/material/CssBaseline'; 
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import { baseURL } from "../../socket";
import { toast } from "react-toastify";
import Loader from "../../componets/Loader";





const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const dispatch = useDispatch();
const { user} = useSelector((state) => state.auth)
const [loading, setLoading] = useState(false)





const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      setLoading(true)
      const response = await fetch(`${baseURL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', 
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

        dispatch(setCredentials({ ...response}))
        toast.success('login successfully')
        navigate('/admin');
}
catch (error) {
  console.error(error);
    toast.error(error?.data?.message || error.message)
}finally {
  setLoading(false)
}
}
useEffect(() => {
  if(user){
      navigate('/admin')
  }
}, [user,navigate])
  return (
    <Stack height={'100vh'} width={'100%'}  direction={'row'}>
        <CssBaseline />
        <Stack height={'100%'}  width={'50%'} bgcolor={'#000000'} display={{ xs: 'none', md: 'block' }}>
            <Stack spacing={4} sx={{justifyContent:'center',alignItems:'center',height:'100%'}}>
                <LeafIcon size={180} />
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
              {
                loading?<Loader/>:(<Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>)
              }
              </Box>

            </Stack>

        </Stack>
    </Stack>
  )
}

export default Login