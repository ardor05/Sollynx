
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const AnalyticsChart = () => {
  return (
    <div className="glass p-6 h-80 w-full">
      <h2 className="text-xl font-semibold mb-6">Analytics</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#141d33', 
              border: '1px solid rgba(0,229,255,0.3)' 
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#00e5ff" 
            strokeWidth={2}
            dot={{ stroke: '#00e5ff', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#00e5ff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
