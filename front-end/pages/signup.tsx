import {
  Button,
  useDisclosure
} from '@chakra-ui/react';
import SignUpModal from '../components/SignUpModal';

export default function SignUp () {
  const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen} colorScheme="green" minWidth={90}>Sign Up</Button>
        <SignUpModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  }