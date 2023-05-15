import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";

const ReportComponent = ({ data, CustomTooltip, title }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#318972" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#3c44b126" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area dataKey="value" stroke="#225f4f" fill="url(#color)" />

          <XAxis dataKey="date" axisLine={false} tickLine={false} />

          <YAxis
            datakey="value"
            axisLine={false}
            tickLine={false}
            tickCount={10}
            allowDecimals={false}
            tickFormatter={(number) => {
              if (number % 2 == 0) {
                return number;
              } else {
                return "";
              }
            }}
          />

          <Tooltip content={<CustomTooltip title={title} />} />

          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default ReportComponent;
