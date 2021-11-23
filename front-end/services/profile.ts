import axios from "axios";

const addToBacklog = async ( gameID: String, userID: BigInt ) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}backlog`, {gameID: gameID, userID: userID})
      return response.data;
}

const addToPlaying = async ( gameID: String, userID: BigInt, platform: String, date: String ) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}playing`, {gameID: gameID, userID: userID, platform: platform, date: date})
      return response.data;
}

const addToPlayed = async ( gameID: String, userID: BigInt, platform: String, startDate: String, endDate: String ) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}played`, {gameID: gameID, userID: userID, platform: platform, startDate: startDate, endDate: endDate})
      return response.data;
}

const addToDropped = async ( gameID: String, userID: BigInt, platform: String, startDate: String, endDate: String ) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}dropped`, {gameID: gameID, userID: userID, platform: platform, startDate: startDate, endDate: endDate})
      return response.data;
}

const favouriteGame = async ( gameID: String, userID: BigInt, favourite: Boolean) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}favourite`, {gameID: gameID, userID: userID, favourite: favourite})
      return response.data;
}

const rateGame = async ( gameID: String, userID: BigInt, rating: Number) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}rating`, {gameID: gameID, userID: userID, rating: rating})
      return response.data;
}

const reviewGame = async ( gameID: String, userID: BigInt, username: String, platform: String, review: String, rating: Number,) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}review`, {gameID: gameID, userID: userID, username: username, platform: platform, review: review, rating: rating})
      return response.data;
}

const deleteReview = async (gameID: String, userID: BigInt) => {
      const config = {
            data: {
              gameID: gameID,
              userID: userID
            }
          }
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}review`, config)
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

const getUser = async(userID: BigInt) => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}${userID}}`)
      return response.data;
}
  
export { addToBacklog, addToPlaying, addToPlayed, addToDropped, favouriteGame, rateGame, reviewGame, deleteReview, deleteGame, getGame, getGames, getUser };