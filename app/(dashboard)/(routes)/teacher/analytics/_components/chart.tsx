"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";

interface Props {
  data: { name: string; total: number }[];
}

const Chart = ({ data }: Props) => {
  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={400}>
        <BarChart data={data}>
          <XAxis
            dataKey={"name"}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey={"total"} fill="#0369a1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
export default Chart;
