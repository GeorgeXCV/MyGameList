import { Box, Image, Link, Text, Icon } from "@chakra-ui/react"
import NextLink from "next/link"
import GameScore from "./GameScore"
import getReleaseDate from "../services/date"
import * as dayjs from 'dayjs'

const GameCard = ({ game }) => {

    return (
      <>
        <Box>
          <Box
            p={4}
            display="flex"
            minHeight={{ base: 250, md: 200 }}
        >
        <NextLink href={`/game/${game.id}`} passHref>
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
            <NextLink href={`/game/${game.id}`} passHref>
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
           <GameScore score={game.score} totalRatings={null} disableOutOf10={true}/>
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