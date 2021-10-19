import {  Button  } from "@chakra-ui/react"
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const YourGameScore = ({ rating, onOpen }) => { 

    if (!rating) {
        return (
            <Button 
                leftIcon={<AiOutlineStar size={25}/>}
                onClick={onOpen}
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
            onClick={onOpen}
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