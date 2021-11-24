import {  Button  } from "@chakra-ui/react"
import { EditIcon } from '@chakra-ui/icons'

const WriteReviewButton = ({user, onLoginOpen, onModalOpen }) => { 
        return (
            <Button 
                leftIcon={<EditIcon/>}
                onClick={user ? onModalOpen : onLoginOpen}
                mt={2}
                color="white.500"
                fontSize="md"
                display="flex"
                placeItems="center"
            >
            Write Review </Button>
          )
}

export default WriteReviewButton;