import {  HStack, Box, Text, useColorModeValue } from '@chakra-ui/react'
import DarkModeSwitch from './DarkModeSwitch';
import SearchBar from './SearchBar'
import UserMenu from './UserMenu';
import LoginForm from '../pages/login'
import SignUpForm from '../pages/signup'

export default function NavigationBar ({ user }) {
    const colour = useColorModeValue("red.500", "white")

    return (
        <HStack spacing="24px" paddingTop="5">
            <Box w="300px">
            <Text colour={colour} fontSize="4xl">MyGameList</Text>
            </Box>
            <SearchBar />
            {user !== null
            ? 
                <UserMenu user={user.username} />
            
            : <>
                <LoginForm />
                <SignUpForm /> 
                </>  
            }
            <DarkModeSwitch />
        </HStack>
    )
}