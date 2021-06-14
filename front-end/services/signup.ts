import axios from "axios";

const signup = async ( credentials: Object ) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}signup`, credentials)
    return response.data;
  }
  
export default { signup }