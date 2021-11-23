import axios from "axios";

const getReviews = async ( gameID: String ) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/reviews/${gameID}`)
    return response.data;
}

export default getReviews;