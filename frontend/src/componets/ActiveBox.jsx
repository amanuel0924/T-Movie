/* eslint-disable react/prop-types */

import { Box } from '@mui/material'

const ActiveBox = ({hight,width,bottom,left,shadow,isActive}) => {
  return (
    <Box
      className="hoverBox"
      height={hight||'8px'}
      width={width||'90px'}
      bgcolor={'white'}
      sx={{
        display: isActive||'none',
        position: 'absolute',
        bottom: bottom ||-8,
        left: left||'35%',
        boxShadow: shadow||'0px 5px 10px 1px white'
      }}
    />
  )
}

export default ActiveBox