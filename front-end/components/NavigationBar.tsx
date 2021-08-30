import {  HStack, Box, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
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
                <Link href="/">
                 <Text colour={colour} fontSize="4xl" cursor={"pointer"}>MyGameList</Text>
                </Link>
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