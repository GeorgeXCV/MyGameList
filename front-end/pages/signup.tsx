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
  email: yup.string().required('Email is required.').email('Must be a valid email address.'),
  username: yup.string().required('Username is required.').min(3, 'Usernames must be at least 3 characters long.'),
  password: yup.string().required('Password is required.').min(8, 'Passwords must be least 8 characters long.'),
});

type SignUpFormInputs = {
  email: string;
  username: string;
  password: string;
};

export default function SignUp({ handleSignUp }) {
  const { register, handleSubmit, formState:{ errors }  } = useForm<SignUpFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: SignUpFormInputs) => {
    handleSignUp(values.email, values.username, values.password)
  }
  
  const { isOpen, onOpen, onClose } = useDisclosure()
    
    return (
      <>
      <Button onClick={onOpen} colorScheme="green">Sign Up</Button>

      <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
        <ModalOverlay />
          <ModalContent>

            <ModalHeader>Sign Up</ModalHeader>
            <ModalCloseButton />
              <ModalBody pb={6}>
                  <FormControl
                   isInvalid={!!errors?.email?.message}
                   errortext={errors?.email?.message}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name='email' placeholder='Email' {...register('email')}/>
                    <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                  </FormControl>
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
              <Button onClick={handleSubmit(onSubmit)} disabled={!!errors.email || !!errors.username || !!errors.password} type="submit" colorScheme="blue" width="full" mr={3}>
                Sign Up
              </Button>
              <Button onClick={onClose} colorScheme="red">Cancel</Button>
          </ModalFooter>
        </ModalContent>
       </Modal>
      </>
    );
  }