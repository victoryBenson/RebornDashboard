'use client';
import { getUsers } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useMemo } from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bubble } from 'react-chartjs-2';
import { color } from "chart.js/helpers";
  ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

 

const BubbleChart = () => {
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
        datasets: [
            {
              label: 'Rating 1 Dataset',
              data: [
                { x: 10, y: 20, r: 5 },
                { x: 15, y: 10, r: 10 },
                { x: 20, y: 30, r: 10 },
                { x: 25, y: 20, r: 5 },
                { x: 30, y: 10, r: 8 },
              ],
              backgroundColor: '#ECFFDC',
              borderWidth: 1,
            },
            {
              label: 'Rating 2 Dataset',
              data: [
                { x: 15, y: 25, r: 4 },
                { x: 20, y: 15, r: 8 },
                { x: 25, y: 35, r: 5 },
                { x: 30, y: 25, r: 7 },
                { x: 35, y: 15, r: 4 },
              ],
              backgroundColor: '#2E8B57',
              borderWidth: 1,
            },
            {
                label: 'Rating 3 Dataset',
                data: [
                  { x: 1, y: 10, r: 5 },
                  { x: 2, y: 20, r: 4 },
                  { x: 3, y: 30, r: 2 },
                ],
                backgroundColor: '#7E2B7',
                borderWidth: 1,
              },
              {
                label: 'Dataset 4',
                data: [
                  { x: 15, y: 5, r: 10 },
                  { x: 20, y: 10, r: 4 },
                  { x: 5, y: 2, r: 7 },
                ],
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
              },
        ],
    };
    
    const options = {
        responsive: true,
        scales: {
            x: {
            beginAtZero: true,
            },
            y: {
            beginAtZero: true,
            }
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
            enabled: true,
            },
            title: {
                display: true,
                text: 'BubbleChart of product rating over brand',
                font: {
                    size: 16,
                    family: 'Helvetica',
                    weight: 'bold',
                  },
                  color: '#2b5e49'
            }
  },
};

    if(isLoading){
      return <div>Loading...</div>
    }
  
    if(isError){
      return <div>An error occurred</div>
    }
  
        
    return (
        <div className='m-auto rounded-lg bg-white w-full min-h-80 flex'>
            <Bubble  data={data} options={options} />
        </div>
    )
}

export default BubbleChart;