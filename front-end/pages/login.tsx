import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';

const schema = yup.object().shape({
  username: yup.string().required('Username is required.').min(3, 'Usernames are at least 3 characters long.'),
  password: yup.string().required('Password is required.').min(8, 'Passwords are at least 8 characters long.'),
});

type LoginFormInputs = {
  username: string;
  password: string;
};

export default function LoginForm({ handleLogin }) {
  const { register, handleSubmit, formState:{ errors }  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: LoginFormInputs) => {
    handleLogin(values.username, values.password)
  }
  
  const { isOpen, onOpen, onClose } = useDisclosure()
    
    return (
      <>
      <Button onClick={onOpen} colorScheme="blue">Login</Button>

      <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
        <ModalOverlay />
          <ModalContent>

            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
              <ModalBody pb={6}>
                  <FormControl
                   isInvalid={!!errors?.username?.message}
                   errortext={errors?.username?.message}
                  >
                    <FormLabel>Username</FormLabel>
                    <Input type="username" name='username' placeholder='Username' {...register('username')}/>
                    <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl 
                    isInvalid={!!errors?.password?.message}
                    errortext={errors?.password?.message}
                    mt={6}
                  >
                    <FormLabel>Password</FormLabel>
                    <Input name='password' type="password" placeholder="*******" {...register('password')}/>
                    <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
                  </FormControl>
                </ModalBody>
            <ModalFooter>
              <Button onClick={handleSubmit(onSubmit)} disabled={!!errors.username || !!errors.password} type="submit" colorScheme="blue" width="full" mr={3}>
                Sign In
              </Button>
              <Button onClick={onClose} colorScheme="red">Cancel</Button>
          </ModalFooter>
        </ModalContent>
       </Modal>
      </>
    );
  }