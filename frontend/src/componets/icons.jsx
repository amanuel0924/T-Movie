import { Avatar, Box, SvgIcon } from "@mui/material"
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
export const ChannelIcon = () => {
  return (
    <SvgIcon >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 12 12"
      >
        <path
          fill="currentColor"
          d="M3 1a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3.085a1.5 1.5 0 1 0 0-1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1h1a2 2 0 0 0-2-2zm5 6.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0M9 11a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5.915a1.5 1.5 0 1 0 0 1H9a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1H4a2 2 0 0 0 2 2zM4.5 5a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"
        />
      </svg>
    </SvgIcon>
  )
}

export const LeafIcon = ({size=40}) => {
  return (
    <SvgIcon sx={{ fontSize: size }}>
      <svg id="1"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 512 512"
      >
        <defs>
          <linearGradient id="gradient2" x1="100%" y1="50%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#6a5ce6", stopOpacity: 0.9 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#a37acf", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient2)"
          d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4c2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4s-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10c0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5c-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10c-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5c-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8s9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1s0-17.5 5-22.5"
        />
      </svg>
    </SvgIcon>
  )
}

export const ProgramIcons=()=>{
  return <SvgIcon  >
    <AllInclusiveIcon />
  </SvgIcon>
}

export const WetherIcon = () => { 
  return (<SvgIcon>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="currentColor" d="M21.503 40a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m-13.5-2a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M26 12.01c6.337 0 9.932 4.194 10.455 9.26h.16c4.078 0 7.384 3.297 7.384 7.365s-3.306 7.364-7.385 7.364H15.386c-4.078 0-7.384-3.297-7.384-7.365s3.306-7.365 7.384-7.365h.16c.526-5.099 4.118-9.26 10.455-9.26M7.569 20.19a1.75 1.75 0 0 1-.499 2.3l-.142.09l-1.299.75a1.75 1.75 0 0 1-1.892-2.94l.142-.09l1.3-.75a1.75 1.75 0 0 1 2.39.64m14.14-9.528c-3.801 1.22-6.509 4.09-7.62 7.922l-.094.34l-.116.476l-.412.077a9.3 9.3 0 0 0-3.341 1.43A7.883 7.883 0 0 1 21.71 10.662M5.505 9.978l.132.056l1.36.634a1.75 1.75 0 0 1-1.347 3.227l-.132-.055l-1.36-.634a1.75 1.75 0 0 1 1.347-3.228m19.11-5.762a1.75 1.75 0 0 1 .508 2.317l-.078.12l-.86 1.23a1.75 1.75 0 0 1-2.945-1.887l.078-.121l.86-1.229a1.75 1.75 0 0 1 2.438-.43m-10.291-.419l.065.156l.513 1.41a1.75 1.75 0 0 1-3.224 1.352l-.065-.156l-.513-1.41a1.75 1.75 0 0 1 3.224-1.352"/></svg>
  </SvgIcon>)}


export const HboIcon = ({size}) => {
  return (
    <SvgIcon sx={{ fontSize: size }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.042 16.896H4.414v-3.754H2.708v3.754H.01L0 7.22h2.708v3.6h1.706v-3.6h2.628zm12.043.046C21.795 16.94 24 14.689 24 11.978a4.89 4.89 0 0 0-4.915-4.92c-2.707-.002-4.09 1.991-4.432 2.795c.003-1.207-1.187-2.632-2.58-2.634H7.59v9.674l4.181.001c1.686 0 2.886-1.46 2.888-2.713c.385.788 1.72 2.762 4.427 2.76zm-7.665-3.936c.387 0 .692.382.692.817s-.305.817-.692.817h-1.33v-1.634zm.005-3.633c.387 0 .692.382.692.817c0 .436-.305.818-.692.818h-1.33V9.373zm1.77 2.607c.305-.039.813-.387.992-.61c-.063.276-.068 1.074.006 1.35c-.204-.314-.688-.701-.998-.74m3.43 0a2.462 2.462 0 1 1 4.924 0a2.462 2.462 0 0 1-4.925 0zm2.462 1.936a1.936 1.936 0 1 0 0-3.872a1.936 1.936 0 0 0 0 3.872"/></svg>
    </SvgIcon>
  )
}

export const SearchIcon = () => { 
  return <Avatar sx={{backdropFilter: 'blur(3px)',backgroundColor: 'rgba(25, 26, 56, 0.5)'}}> <SearchIcon/></Avatar>}

export const ChevronIcon = ({size,p,m}) => {
  return (
   <Box p={p} m={m}>
     <Avatar>
    <ChevronLeftIcon  sx={{fontSize:size}} />
  </Avatar>
    </Box>
   
  )
}



LeafIcon.propTypes = {
  size: PropTypes.number,
};


HboIcon.propTypes = {
  size: PropTypes.number,
};

ChevronIcon.propTypes = {
  size: PropTypes.number,
  p: PropTypes.number,
  m: PropTypes.number,
};