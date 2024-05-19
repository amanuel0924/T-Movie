import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { LeafIcon, ChannelIcon, ProgramIcons } from '../../assets/icons';
import Channel from './Channel';
import Program from './Program';
import Overview from './Overview';
import { Route, Routes,useNavigate } from 'react-router-dom';
const drawerWidth = 240;
const lists = [
    {
        text: 'Overview',
        icon: <DashboardIcon />,
        path: ''
    },
    {
        text: 'Channel',
        icon: <ChannelIcon />,
        path: 'channel'
    },
    {
        text: 'Program',
        icon: <ProgramIcons />,
        path: 'program'
    }
]

export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Permanent drawer
                    </Typography>
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
                <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }} >
                    <LeafIcon />


                    <Typography sx={{ fontWeight: 'bold' }} variant="h6" noWrap component="div">
                        T-Movie
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {lists.map((list) => (
                        <ListItem key={list.text} disablePadding>
                            <ListItemButton onClick={() => navigate(list.path)}>
                                <ListItemIcon>
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
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <Routes>
                    <Route path='' exact element={<Overview />} />
                    <Route path="channel" element={<Channel />} />
                    <Route path="program" element={<Program />} />
                </Routes>

            </Box>
        </Box>
    );
}

