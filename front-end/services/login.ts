import axios from "axios";

const login = async ( credentials: Object ) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}login`, credentials)
    return response.data;
  }
  
export default { login }