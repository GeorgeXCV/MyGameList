import { Box, Image, Link, Text, Icon } from "@chakra-ui/react"
import NextLink from "next/link"
import * as dayjs from 'dayjs'

const GameCard = ({ game }) => {

  const getReleaseDate = (date: String) => {
    const dateMonth = date.substring(0, 6);
    const year = date.substring(date.length-4)
    if (dateMonth === '31 Dec') {
      return `${year}`
    } else if (dateMonth === "30 Sep") {
      return `Q3 ${year}`
    } else if (dateMonth === "30 Jun") {
      return `Q2 ${year}`
    } else if (dateMonth === "30 Mar") {
      return `Q1 ${year}`
    } else {
      return date
    }
  }

    return (
      <>
        <Box>
          <Box
            p={4}
            display="flex"
            minHeight={{ base: 250, md: 200 }}
        >
        <NextLink href={`/${game.id}`} passHref>
         <a>
            <Image
              width={{ md: 200 }}
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
            ml={{ md: 8 }}
            display="flex"
            justifyContent="center"
            flexDirection="column"
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
           {game.score ?
            <Text
            mt={2}
            color="gray.500"
            fontSize="md"
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
            : 
            <Text>
              {getReleaseDate(dayjs.unix(game.first_release_date).format('DD MMM, YYYY'))}
            </Text>
           }

          </Box>
        </Box>
      </>
    );
}

export default GameCard;