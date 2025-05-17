import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface DataPoint {
  name: string; // month
  revenue: number;
  credit: number;
  profit: number;
}

interface AnalyticsChartProps {
  data: DataPoint[];
}

const AnalyticsChart = ({ data }: AnalyticsChartProps) => {
  return (
    <div className="glass p-6 h-96 w-full">
      <h2 className="text-xl font-semibold mb-6">Analytics</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip
            contentStyle={{ backgroundColor: '#141d33', border: '1px solid rgba(0,229,255,0.3)' }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#00e5ff"
            strokeWidth={2}
            dot={{ stroke: '#00e5ff', strokeWidth: 2, r: 4 }}
            name="Revenue"
          />
          <Line
            type="monotone"
            dataKey="credit"
            stroke="#ff6f61"
            strokeWidth={2}
            dot={{ stroke: '#ff6f61', strokeWidth: 2, r: 4 }}
            name="Credit"
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#4caf50"
            strokeWidth={2}
            dot={{ stroke: '#4caf50', strokeWidth: 2, r: 4 }}
            name="Profit"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
