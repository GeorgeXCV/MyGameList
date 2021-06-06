import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import DarkModeSwitch from '../components/DarkModeSwitch'
import { Text, Button, HStack, Box, useColorModeValue } from '@chakra-ui/react'

export default function Home() {
  const colour = useColorModeValue("red.500", "white")
  return (
    <div className={styles.container}>
      <HStack spacing="24px" paddingTop="5">
        <Box w="300px">
        <Text colour={colour} fontSize="4xl">MyGameList</Text>
        </Box>
        <Button colorScheme="blue">Login</Button>
        <Button colorScheme="green">Sign Up</Button>
        <DarkModeSwitch />
      </HStack>
    </div>
  )
}
