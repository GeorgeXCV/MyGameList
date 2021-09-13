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

const addToPlaying = async ( game: String, platform: String, date: String, user: String ) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}playing`, {gameID: game, platform: platform, date: date, username: user})
      return response.data;
}

const deleteFromPlaying = async (game: String, user: String) => {
      const config = {
            data: {
              gameID: game,
              username: user
            }
          }
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}playing`, config)
      return response.data;
}

const getPlaying = async ( user: String ) => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}playing/${user}`)
      return response.data;
}
  
export { addToBacklog, deleteFromBacklog, getBacklog, addToPlaying, deleteFromPlaying, getPlaying };