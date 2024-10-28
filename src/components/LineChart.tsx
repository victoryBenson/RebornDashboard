'use client';
import { getUsers } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

 

const LineChart = () => {
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
        labels: uniqueDisplay?.map((product)=> product.brand),
        datasets: [
          {
            label: 'Rating',
            data: uniqueDisplay?.map((product)=> product.rating),
            backgroundColor: 'rgb(80, 200, 120)',
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
            text: 'LineChart of product rating over brand',
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
      <Line data={data} options={options} />
    </div>
 )
}

export default LineChart;