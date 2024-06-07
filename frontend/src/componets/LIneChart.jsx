/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const COLORS = ["#9b59b6", "#e74c3c", "#f1c40f", "#2ecc71"]; // Array of colors

const ProgramLineChart = ({ data = [] }) => {
  const typeMapping = {
    1: 'Live TV',
    2: 'Movies',
    3: 'TV Shows',
    4: 'Sports',
  };

  const transformedData = data.map((item,) => ({
    name: typeMapping[item.typeId] || `Program Type ${item.typeId}`,
    value: item._count.id,
    typeId: item.typeId,
    starts:0
  }));

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <LineChart width={600} height={400} data={transformedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Line key="name" type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      
      </LineChart>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Program Distribution</Typography>
        <ul>
          {transformedData.map((item) => (
            <li key={item.name} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: COLORS[item.typeId - 1], marginRight: '5px' }} />
              <Typography>{item.name} ({item.value})</Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default ProgramLineChart;
