import axios from "axios";

const addToBacklog = async ( gameID: String, userID: BigInt ) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}backlog`, {gameID: gameID, userID: userID})
      return response.data;
}

const addToPlaying = async ( gameID: String, userID: BigInt, platform: String, date: String ) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}playing`, {gameID: gameID, userID: userID, platform: platform, date: date})
      return response.data;
}

const deleteGame = async (gameID: String, userID: BigInt) => {
      const config = {
            data: {
              gameID: gameID,
              userID: userID
            }
          }
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}game`, config)
      return response.data;
}


const getGame = async ( gameID: String, userID: BigInt ) => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}${gameID}/${userID}`)
      return response.data;
}

const getGames = async ( user: String ) => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}games/${user}`)
      return response.data;
}

  
export { addToBacklog, addToPlaying, deleteGame, getGame, getGames };