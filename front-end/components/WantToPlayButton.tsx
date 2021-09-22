import { Button } from "@chakra-ui/react";
import { useState } from 'react';
import { addToBacklog } from '../services/profile'

const WantToPlayButton = ({ game, user, setGameStatus }) => {

    const [loading, isLoading] = useState(false)

    const addGame = async () => {
            isLoading(true)
            await addToBacklog(game.id, user.id)
            isLoading(false)
            setGameStatus("Backlog")
    }

    return (
        <Button 
            background={"green"} 
            onClick={addGame} 
            isLoading={loading} 
            loadingText={"Adding Game"}>
                Want to Play
        </Button>
    );
}

export default WantToPlayButton;