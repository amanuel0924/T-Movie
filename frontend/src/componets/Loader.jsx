import { Box, } from "@mui/material"
import { CircularProgress } from "@mui/material"

const Loader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
       <CircularProgress  />
      </Box>
    )
  }
  
  export default Loader
  