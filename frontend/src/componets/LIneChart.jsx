/* eslint-disable react/prop-types */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';







const ProgramLineChart = ({data}) => {

    const typeMapping = {
        1: 'Live TV',
        2: 'Movies ',
        3: 'TV Shows',
        4: 'Sports'
    };
    
    const transformedData = data.map(item => ({
        name: typeMapping[item.typeId] || `Program Type ${item.typeId}`,
        count: item._count.id
    }));
    return  (<LineChart
    width={600}
    height={400}
    data={transformedData}
    margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    
    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
</LineChart>)
}

export default ProgramLineChart;
