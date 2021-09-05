import axios from "axios";

const addToBacklog = async ( game: String, user: String ) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}backlog`, {gameID: game, username: user})
      return response.data;
}

const deleteFromBacklog = async (game: String, user: String) => {
      const config = {
            data: {
              gameID: game,
              username: user
            }
          }
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}backlog`, config)
      return response.data;
}

const getBacklog = async ( user: String ) => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}backlog/${user}`)
      return response.data;
}
  
export { addToBacklog, deleteFromBacklog, getBacklog };