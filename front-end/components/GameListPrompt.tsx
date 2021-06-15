import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const GameListPrompt = () => {
    return (
        <Box mt={10} width={"60%"}>
        <Box left={0}>
          <Heading size="lg">
            What To Play
          </Heading>
        </Box>
        <Box textAlign={"center"}>
        <AddIcon />
        <Text>Sign in to access your Game List</Text>
        <Text>Save games to keep track of what you want to play</Text>
        <Button>Login</Button>
        </Box>
      </Box>
    )
}


export default GameListPrompt;