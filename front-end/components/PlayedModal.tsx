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
  import { addToPlayed } from '../services/profile';

const PlayedModal = ({ isOpen, onClose, game, gameEntry, user }) => {
    const dateObject = new Date();
    dateObject.setDate(dateObject.getDate());
    const currentDate = dateObject.toISOString().substr(0,10);

    const [loading, isLoading] = useState(false)
    const [startDate, setStartDate] = useState(currentDate)
    const [endDate, setEndDate] = useState(currentDate)
    const [platform, setPlatform] = useState(game.platforms[0])


    const addGame = async () => {
            isLoading(true)
            await addToPlayed(game.id, user.id, platform, startDate, endDate)
            isLoading(false)
            onClose()
    }

    useEffect(() => {  
        if (gameEntry) {
            if (gameEntry.platform) {
                setPlatform(gameEntry.platform)
            }
            if (gameEntry.startDate) {
                setStartDate(gameEntry.startDate)
            }
        }
  }, [])


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
        <ModalOverlay />
            <ModalContent>
                <ModalHeader>Played</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <PlatformButtons platforms={game.platforms} setPlatform={setPlatform} /> 
                    <Box paddingTop={5}>
                        <Text as="em"> Started <Input marginTop={5} type={"date"} defaultValue={"Optional"} onChange={(event) => setStartDate(event.target.value)}/> </Text>
                        <Text as="em"> Finished <Input marginTop={5} type={"date"} defaultValue={currentDate} onChange={(event) => setEndDate(event.target.value)}/> </Text>
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

export default PlayedModal;