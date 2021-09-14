import axios from "axios";

const addToBacklog = async ( game: String, user: String ) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}backlog`, {gameID: game, username: user})
      return response.data;
}

const addToPlaying = async ( game: String, platform: String, date: String, user: String ) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}playing`, {gameID: game, platform: platform, date: date, username: user})
      return response.data;
}

const deleteGame = async (game: String, user: String) => {
      const config = {
            data: {
              gameID: game,
              username: user
            }
          }
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}game`, config)
      return response.data;
}


const getGame = async ( user: String, game: String ) => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}${game}/${user}`)
      return response.data;
}

const getGames = async ( user: String ) => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}games/${user}`)
      return response.data;
}

  
export { addToBacklog, addToPlaying, deleteGame, getGame, getGames };