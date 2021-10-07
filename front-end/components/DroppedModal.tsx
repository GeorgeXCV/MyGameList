import {
    Text,
    Input,
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
  import { useEffect, useState } from 'react';
  import PlatformButtons from './PlatformButtons';
  import { addToDropped } from '../services/profile';

const DroppedModal = ({ isOpen, onClose, game, gameEntry, user, setGameStatus }) => {
    const dateObject = new Date();
    dateObject.setDate(dateObject.getDate());
    const currentDate = dateObject.toISOString().substr(0,10);

    const [loading, isLoading] = useState(false)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(currentDate)
    const [platform, setPlatform] = useState(game.platforms[0])
    const [defaultPlatform, setDefaultPlatform] = useState(null)


    const addGame = async () => {
            isLoading(true)
            await addToDropped(game.id, user.id, platform, startDate, endDate)
            isLoading(false)
            setGameStatus('Dropped')
            onClose()
    }

    useEffect(() => {  
        if (gameEntry) {
            if (gameEntry.platform) {
                setPlatform(gameEntry.platform)
                setDefaultPlatform(gameEntry.platform)
            }
            if (gameEntry.startDate) {
                setStartDate(gameEntry.startDate.substring(0, 10)) // Remove timestamp from date so correct format for form
            }
        }
  }, [isOpen === true])


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
        <ModalOverlay />
            <ModalContent>
                <ModalHeader>Dropped</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <PlatformButtons platforms={game.platforms} setPlatform={setPlatform} defaultPlatform={defaultPlatform}/> 
                    <Box paddingTop={5}>
                        <Text as="em"> Started <Input marginTop={5} type={"date"} defaultValue={startDate} onChange={(event) => setStartDate(event.target.value)}/> </Text>
                        <Text as="em"> Stopped <Input marginTop={5} type={"date"} defaultValue={currentDate} onChange={(event) => setEndDate(event.target.value)}/> </Text>
                    </Box>
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

export default DroppedModal;