'use client';
import { getUsers } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS,
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title,
  Tooltip,
  Legend, } from "chart.js";

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

 

const BarChart = () => {
    const {users: products, isLoading, isError} = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch();
  
    useEffect(() =>{
      const promise = dispatch(getUsers())
  
      return () => {
        promise.abort();
      };
    }, [])

    console.log(products)

    const uniqueDisplay = useMemo( () => {

        const displayOnce = new Set<string>();
   
        return products?.filter(product => {
            if(displayOnce.has(product?.brand)){
                return false
            }else {
                displayOnce.add(product?.brand)
                return true
            }
        })

    },[products])

  


    const data = {
        labels: uniqueDisplay?.slice(0,7).map((product)=> product.brand),
        datasets: [
          {
            label: 'Rating',
            data: uniqueDisplay?.slice(0,7).map((product)=> product.rating),
            backgroundColor: [
              'rgb(80, 200, 120)',
              'rgb(10, 500, 170)',
              'rgba(255, 102, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)', 
              'rgba(255, 206, 86, 0.6)', 
              'rgba(75, 192, 192, 0.6)', 
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 138, 80, 0.6)',
              'rgba(54, 129, 235, 0.6)',
          ],
          },
        ],
    };
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'BarChart of product rating over brand',
          },
        },
      };

    if(isLoading){
      return <div>Loading...</div>
    }
  
    if(isError){
      return <div>An error occurred</div>
    }
  
        
    return (
     <div className='m-auto p-4 border rounded-lg bg-white w-full col-span-1'>
        <Bar data={data} options={options} />
    </div>
    )
}

export default BarChart;