"use client";
import { useCurrentUser } from "@/contexts/user-context";
import { PieChart, Pie, Cell } from "recharts";

export default function Chart() {
  const user = useCurrentUser();
  
  // Exclude the 'stripe_verified' field from profile data
  const profileFields = Object.entries(user).filter(([key, _]) => key !== 'stripe_verified');
  
  const numOfProfileData = profileFields.length;

  const numOfCompletion = profileFields.filter(([_, value]) =>
    Boolean(value)
  ).length;

  const numOfUnCompletion = profileFields.filter(
    ([_, value]) => !Boolean(value)
  ).length;

  const percentageCompleted = `${Math.round(
    (numOfCompletion / numOfProfileData) * 100
  )}%`;

  const data = [
    {
      name: "uncompleted",
      value: numOfUnCompletion,
    },
    {
      name: "completed",
      value: numOfCompletion,
    },
  ];

  const renderPercentage = ({ cx, cy }: any) => {
    return (
      <>
        <text
          x={cx}
          y={cy}
          dy={8}
          fontSize={24}
          fontWeight={400}
          className="fill-gray-900"
          textAnchor="middle"
        >
          {percentageCompleted}
        </text>
      </>
    );
  };

  return (
    <PieChart width={140} height={130}>
      <Pie
        data={data}
        cx={80}
        cy={60}
        innerRadius={40}
        outerRadius={55}
        paddingAngle={5}
        dataKey="value"
        activeIndex={0}
        activeShape={renderPercentage}
      >
        <Cell className="fill-gray-50 bg-gray-50" />
        <Cell className="bg-primary fill-primary" />
      </Pie>
    </PieChart>
  );
}
