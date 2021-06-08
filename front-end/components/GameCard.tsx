import { Box, Image, Link, Text, Icon } from "@chakra-ui/react"
import NextLink from "next/link"

const GameCard = ({ game }) => {

    return (
      <>
        <Box>
          <Box
            p={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight={{ base: 250, md: 200 }}
        >
        <NextLink href={`/${game.id}`} passHref>
         <a>
            <Image
              width={{ md: 150 }}
              height={{ md: 225 }}
              objectFit="contain"
              src={game.cover}
              fallbackSrc={`https://via.placeholder.com/175x200?text=${game.name}`}
              alt="Game Cover"
            />
         </a>
        </NextLink>
          </Box>
          <Box
            mt={{ base: 2 }}
            ml={{ md: 6 }}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            p={4}
            minWidth="0"
            w="full"
          >
            <NextLink href={`/${game.id}`} passHref>
              <Link
                display="block"
                fontSize="xl"
                lineHeight="normal"
                fontWeight="bold"
                mt={{ md: 0 }}
              >
                {game.name}
              </Link>
            </NextLink>
           <Text
              mt={2}
              color="gray.500"
              fontSize="sm"
              display="flex"
              placeItems="center"
            >
              <Icon mr={1}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"
                    fill="rgb(245, 197, 24)"
                  />
                </svg>
              </Icon>
              {game.score}
            </Text>
          </Box>
        </Box>
      </>
    );
}

export default GameCard;