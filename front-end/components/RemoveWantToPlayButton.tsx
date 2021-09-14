import { Button } from "@chakra-ui/react";
import { CheckIcon } from '@chakra-ui/icons'
import { useState } from 'react';
import { deleteGame } from '../services/profile'

const RemoveWantToPlayButton = ({ game, user, setGameStatus }) => {

    const [loading, isLoading] = useState(false)

    const removeGame = async () => {
            isLoading(true)
            await deleteGame(game.id, user)
            isLoading(false)
            setGameStatus(null)
    }

    return (
            <Button 
                background={"grey"} 
                onClick={removeGame} 
                rightIcon={<CheckIcon/>} 
                isLoading={loading} 
                loadingText={"Removing Game"}>
                    Want to Play
            </Button>
    );
}

export default RemoveWantToPlayButton;