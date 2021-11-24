import {
  Button,
  useDisclosure
} from '@chakra-ui/react';
import LoginModal from '../components/LoginModal';

export default function LoginForm() {
  const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen} colorScheme="blue" minWidth={90}>Login</Button>
        <LoginModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  }