import { Icon } from "@chakra-ui/react"
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { favouriteGame } from "../services/profile"
import { useEffect, useState } from 'react';


const FavouriteButton = ({game, user, gameEntry }) => {
    const [favourite, setFavourite] = useState(false)

    useEffect(() => {  
        if (gameEntry) {
            if (gameEntry.favourite) {
                setFavourite(gameEntry.favourite)
            }
        }
  }, [gameEntry])

    const addFavourite = async () => {
        favouriteGame(game.id, user.id, true)
        setFavourite(true)
    }

    const removeFavourite = async () => {
        favouriteGame(game.id, user.id, false)
        setFavourite(false)
    }

    if (favourite) {
        return (
            <Icon 
                as={AiFillHeart}
                onClick={() => removeFavourite()}
                w={8} 
                h={8}
                color={"red"}
                cursor={"pointer"}
            />
        )
    } else {
        return (
            <Icon 
                as={AiOutlineHeart}
                onClick={() => addFavourite()}
                w={8} 
                h={8}
                cursor={"pointer"}
            />
        )
    }
  
}

export default FavouriteButton