import {
    Input,
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
  import PlatformButtons from './PlatformButtons';
  import { addToPlaying } from '../services/profile';

const PlayingModal = ({ isOpen, onClose, game, user, setGameStatus }) => {
    const dateObject = new Date();
    dateObject.setDate(dateObject.getDate());
    const currentDate = dateObject.toISOString().substr(0,10);

    const [loading, isLoading] = useState(false)
    const [date, setDate] = useState(currentDate)
    const [platform, setPlatform] = useState(game.platforms[0])


    const addGame = async () => {
            isLoading(true)
            await addToPlaying(game.id, user.id, platform, date)
            isLoading(false)
            setGameStatus('Playing')
            onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
        <ModalOverlay />
            <ModalContent>
                <ModalHeader>Playing</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <PlatformButtons platforms={game.platforms} setPlatform={setPlatform} defaultPlatform={platform}/> 
                <Input marginTop={5} type={"date"} defaultValue={currentDate} onChange={(event) => setDate(event.target.value)}/>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        type="submit" 
                        colorScheme="green" 
                        width="full" 
                        mr={3} 
                        isLoading={loading} 
                        loadingText={"Adding"}
                        onClick={addGame}>Add</Button>
                    <Button colorScheme="red" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default PlayingModal;