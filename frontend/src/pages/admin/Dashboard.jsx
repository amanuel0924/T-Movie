import {useState,useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { LeafIcon, ChannelIcon, ProgramIcons } from '../../componets/icons';
import Channel from './Channel';
import Program from './Program';
import Overview from './Overview';
import { Route, Routes,useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from './../../redux/authSlice';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
const drawerWidth = 240;

const lists = [
    {
        text: 'Overview',
        icon: <DashboardIcon />,
        path: '/admin'
    },
    {
        text: 'Channel',
        icon: <ChannelIcon />,
        path: '/admin/channel'
    },
    {
        text: 'Program',
        icon: <ProgramIcons />,
        path: '/admin/program'
    }
]

export default function Dashboard() {
  
    const [header, setHeader] = useState('');
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);

    
  
    const dispatch = useDispatch();
    const handlelogout = async () => {
    
      try {
            axios.defaults.withCredentials = true;
           await axios.post('/api/auth/logout')
          dispatch(logout())
          navigate('/');
  }
  catch (error) {
    console.error(error);
      toast.error(error?.data?.message || error.message)
  }
  }
  


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };

    const navigate = useNavigate();
    useEffect(() => {
        const path = location.pathname;
        if(path.includes('channel')){
            setHeader('Channel')
        }else if(path.includes('program')){
            setHeader('Program')
        }else{
            setHeader('Dashboard')
        }        
    }, [location.pathname]);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                elevation={1}
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,backgroundColor:'#181A41' }}
            >
                <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                    <Typography variant="h6" noWrap component="div">
                         {header}
                    </Typography>
                    <div>
                    <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          
            <NotificationsIcon />
          
        </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{marginTop:'30px'}}
              >
                <MenuItem sx={{padding:'10px 30px',display:'flex',flexDirection:'column' ,justifyContent:'center',borderBottom:'solid 1px' }}  >
                
<AccountCircleOutlinedIcon fontSize='large' />
                <Typography  textAlign="center">Admin</Typography>
                  <Typography variant="caption" display="block" textAlign="center">admin@email.com</Typography>
                </MenuItem>
                 <MenuItem sx={{display:'flex',justifyContent:'center',color:'red', fontSize:'12px'}}  >
                  <Button  onClick={handlelogout}  variant='text'  color='error' >LOGOUT</Button>
                </MenuItem>
              </Menu>
            </div>
                </Toolbar>
               
                
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"    
            >
                <Toolbar   sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '25px',boxShadow: '0 0 10px 0 rgba(0,0,0,0.4)' }}>
                    <LeafIcon />
                    <Typography  sx={{ fontWeight: 'bold' }} variant="h6" noWrap component="div">
                        T-Movie
                    </Typography>
                </Toolbar>
                <Divider />
                <List   >
                    {lists.map((list) => (
                        <ListItem  key={list.text} disablePadding sx={location.pathname === list.path ? { backgroundColor: '#181A41',color:'white',paddingLeft:'30px' ,'&:hover': { backgroundColor: '#181A41' }} : {paddingLeft:'30px','&:hover': { backgroundColor: '#D3D3D3' }}}>
                            <ListItemButton  onClick={() => navigate(list.path)} >
                                <ListItemIcon sx={location.pathname === list.path ? { color:'white' } : {color:'black'}}>
                                    {list.icon}
                                </ListItemIcon>
                                <ListItemText primary={list.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1 , bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <Routes>
                    
                    <Route path='' exact element={<Overview />} />
                    <Route path="channel" element={<Channel />} />
                    <Route path="channel/search/:keyword" element={<Channel />} />
                    <Route path="program" element={<Program />} />
                    <Route path="program/:pageNumber" element={<Program />} />
                    <Route path="program/search/:keyword" element={<Program />} />

                </Routes>

            </Box>
        </Box>
    );
}

