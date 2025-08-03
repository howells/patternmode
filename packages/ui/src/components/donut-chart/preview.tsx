import { DonutChart } from "./component";

export const DonutChartExample = () => {
  const data = [
    { name: "Chrome", value: 61 },
    { name: "Safari", value: 25 },
    { name: "Firefox", value: 8 },
    { name: "Other", value: 6 },
  ];

  return (
    <DonutChart
      data={data}
      category="name"
      value="value"
      valueFormatter={value => `${value}%`}
    />
  );
};
