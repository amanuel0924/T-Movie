/* eslint-disable react/prop-types */
import{ useState } from 'react';
import { IconButton, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { MySearchIcon } from './icons';
import CloseIcon from '@mui/icons-material/Close';

const SearchComponent = ({ searchQuery, setSearchQuery }) => {
  const [showInput, setShowInput] = useState(false);


 const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setShowInput(!showInput);
    setSearchQuery("")
  };




  return (
    <Box   display="flex" alignItems="center">
      <IconButton color='primary' onClick={handleSearchClick} sx={{ marginRight: 1 }}>
       {showInput ? <CloseIcon /> : <MySearchIcon />}
      </IconButton>
      {showInput && (
        <TextField
          autoFocus
          variant="standard"
          size="small"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          sx={{ width:  '200px',bgcolor:'lightgray',borderRadius:'5px',border:'none',padding:'5px' }}
        />
      )}
      {showInput && (
        <IconButton color='primary'  sx={{ marginLeft: 1 }}>
          <SearchIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default SearchComponent;
