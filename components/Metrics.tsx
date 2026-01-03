
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';

interface MetricsProps {
  label: string;
  value: number;
  color: string;
}

const Metrics: React.FC<MetricsProps> = ({ label, value, color }) => {
  const data = [
    { name: 'Value', value: value },
    { name: 'Remainder', value: 100 - value },
  ];

  return (
    <div className="flex flex-col items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 w-full">
      <div className="h-24 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={25}
              outerRadius={35}
              paddingAngle={5}
              dataKey="value"
              startAngle={180}
              endAngle={0}
            >
              <Cell key="cell-0" fill={color} />
              <Cell key="cell-1" fill="#334155" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-[-20px] text-center">
        <span className="text-2xl font-bold text-white">{value}%</span>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
};

export default Metrics;
