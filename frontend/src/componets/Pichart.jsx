/* eslint-disable react/prop-types */

import { PieChart, Pie, Cell, Tooltip,Legend } from 'recharts';


 


const COLORS = ["#9b59b6", "#e74c3c", "#f1c40f", "#2ecc71", "#3498db"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const MyPieChart = ({data}) => {
    const typeMapping = {
        1: 'Recommended',
        2: 'Popular ',
        3: 'Featured',
        4: 'Favorites',
        5:'Watch Later'
    };
    
    const transformedData = data.map(item => ({
        name: typeMapping[item.categoryId] || `Category ${item.categoryId}`,
        value: item._count.id
    }));

    return ( <PieChart width={600} height={400}>
        <Pie
          data={transformedData}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {transformedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend  iconSize={50} width={200} height={200} layout='centric' verticalAlign='middle' align="right"  />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>)
}
;

export default MyPieChart;
