import { Button } from "@chakra-ui/react";
import { CheckIcon } from '@chakra-ui/icons'
import { useContext, useState, useEffect } from 'react';
import { addToBacklog, deleteFromBacklog, getBacklog } from '../services/profile'
import { UserContext } from "../pages/_app";

const WantToPlayButton = ({ game }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [backlog, setBacklog] = useState(false)
    const [loading, isLoading] = useState(false)

    // TODO - If not logged in, open Login form
    const user = useContext(UserContext);

    const addGame = async () => {
            isLoading(true)
            await addToBacklog(game.id, currentUser)
            isLoading(false)
    }

    const removeGame = async () => {
            isLoading(true)
            await deleteFromBacklog(game.id, currentUser)
            isLoading(false)
    }

    useEffect(() => {
        if (user && user.username) {
            setCurrentUser(user.username)
        }
    })

    useEffect(() => {  
            async function checkBacklog() {
                const backlog = await getBacklog(currentUser)
                console.log(backlog)
                if (backlog.some(index => index.game === game.id)) {
                    setBacklog(true)
                } else {
                    setBacklog(false)
                }
            }

            checkBacklog();
      }, [loading === false])


    return (
        <>
        {backlog 
            ? <Button background={"grey"} onClick={removeGame} rightIcon={<CheckIcon/>} isLoading={loading} loadingText={"Removing Game"}>Want to Play</Button>  // If logged in and game on backlog - show want to play with tick - remove from backlog if clicked and change button back to default state
            : <Button background={"green"} onClick={addGame} isLoading={loading} loadingText={"Adding Game"}>Want to Play</Button>   // If logged in and game not on backlog - show want to play
        }
        </>
    );
}

export default WantToPlayButton;