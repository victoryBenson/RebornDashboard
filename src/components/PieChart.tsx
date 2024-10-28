'use client';
import { getUsers } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js'

  ChartJS.register(CategoryScale, LinearScale, PointElement,ArcElement, Title, Tooltip, Legend);

 

const PieChart = () => {
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
            backgroundColor: [
                'rgb(80, 200, 170)',
                'rgba(255, 99, 132, 0.6)', // Red
                'rgba(54, 162, 235, 0.6)', // Blue
                'rgba(255, 206, 86, 0.6)', // Yellow
                'rgba(75, 192, 192, 0.6)', // Green
                'rgba(153, 102, 255, 0.6)', // Purple
                'rgba(255, 159, 64, 0.6)',
                'rgba(54, 162, 235, 0.6)', // Blue
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 2
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
            text: 'PieChart of product rating over brand',
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
        <div className='m-auto rounded-lg bg-white w-full min-h-80 flex'>
            <Pie data={data} options={options} />
        </div>
    )
}

export default PieChart;