'use client';
import { getUsers } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useMemo } from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { PolarArea } from 'react-chartjs-2';

  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

 

const PolarAreaChart = () => {
    const {users: products, isLoading, isError} = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch();
  
    useEffect(() =>{
      const promise = dispatch(getUsers())
  
      return () => {
        promise.abort();
      };
    }, [])


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
            backgroundColor: [
                'rgb(80, 200, 120)',
                'rgb(10, 500, 170)',
                'rgba(255, 102, 132, 0.6)', // Red
                'rgba(54, 162, 235, 0.6)', // Blue
                'rgba(255, 206, 86, 0.6)', // Yellow
                'rgba(75, 192, 192, 0.6)', // Green
                'rgba(153, 102, 255, 0.6)', // Purple
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
          scales: {
            r: {
            angleLines: { display: false },
            suggestedMin: 0,
            suggestedMax: 100,
            },
        },
        title: {
        display: true,
        text: 'PolarAreaChart of product rating over brand',
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
      <div className='m-auto flex w-full p-4 border rounded-lg bg-white'>
          <PolarArea data={data} options={options} />
      </div>
    )
}

export default PolarAreaChart;