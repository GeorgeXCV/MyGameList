import {  Button  } from "@chakra-ui/react"
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const YourGameScore = ({ user, onLoginOpen, onModalOpen, rating }) => { 

    if (!rating) {
        return (
            <Button 
                leftIcon={<AiOutlineStar size={25}/>}
                onClick={user ? onModalOpen : onLoginOpen}
                mt={2}
                color="white.500"
                fontSize="md"
                display="flex"
                placeItems="center"
            >
            Rate </Button>
          )
    } else {
        return (
            <Button 
            leftIcon={<AiFillStar/>}
            onClick={onModalOpen}
            mt={2}
            color="white.500"
            fontSize="md"
             display="flex"
            placeItems="center"
        >
        {rating}/10 </Button>
        )
    }
}

export default YourGameScore;