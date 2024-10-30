import BarChart from "@/components/BarChart";
import BubbleChart from "@/components/BubbleChart";
import DoughnutChart from "@/components/DoughnutChart";
import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";
import PolarAreaChart from "@/components/PolarAreaChart";
import RadarChart from "@/components/RadarChart";

export default function Home() {
 
  return (
    <>
     <div className="px-4 py-10">
       <p className="font-bold text-2xl">Dashboard Overview</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </p>
      </div> 
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4  border my-10">
        <BarChart/>
        <LineChart/>
        <DoughnutChart/>
        <RadarChart/>
        <PolarAreaChart/>
        <PieChart/>
        <BubbleChart/>
      </div>
    </>
  );
}
