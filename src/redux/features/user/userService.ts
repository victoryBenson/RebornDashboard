'use-client'

import axios from "axios";


//getUsers
const getUsers  = async() => {
  const response = await axios.get('https://dummyjson.com/products')
  // console.log(response.data.products)
  return response?.data?.products 
};

const userService = {
  getUsers
}

export default userService