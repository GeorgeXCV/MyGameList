import {
    Text,
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { Rating } from 'react-simple-star-rating'
  import { rateGame } from '../services/profile';

const RatingModal = ({ isOpen, onClose, rating, setRating, game, user }) => {

    const [loading, isLoading] = useState(false)
    const [internalRating, setInternalRating] = useState(rating)

    const handleRating = async (rate: number) => {
            setInternalRating(rate)
    }

    const addRating = async () => {
            isLoading(true)
            await rateGame(game.id, user.id, internalRating)
            setRating(internalRating)
            isLoading(false)
            onClose()
    }

    const removeRating = async () => {
        isLoading(true)
        await rateGame(game.id, user.id, null)
        isLoading(false)
        setRating(null)
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
        <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"}>Rate</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <Text fontSize="xl" textAlign={"center"}> {game?.name} </Text>
                    </Box>
                    <Box paddingLeft={20} paddingTop={5}>
                    <Rating stars={10} onClick={handleRating} ratingValue={internalRating} />
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        type="submit" 
                        colorScheme="green" 
                        width="full" 
                        isDisabled={internalRating <= 0 || internalRating === rating}
                        isLoading={loading} 
                        loadingText={"Rating"}
                        onClick={addRating}>Rate</Button>
                {rating && (
                     <Button 
                     type="submit" 
                     colorScheme="red" 
                     width="full" 
                     isLoading={loading} 
                     loadingText={"Removing"}
                     onClick={removeRating}>Remove rating</Button>
                  )
                }
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default RatingModal;