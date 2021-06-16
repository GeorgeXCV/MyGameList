import { GetServerSideProps } from 'next'
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import GameScore from '../../components/GameScore';
import getReleaseDate from '../../services/date';
import * as dayjs from 'dayjs'

export default function Game ({ game }) {
    return (
        <Box>
            <Box>
                <Image
                src={game.cover}
                fallbackSrc={`https://via.placeholder.com/175x200?text=${game.name}`}
                alt="Game Cover"
                />
                <GameScore score={game.score} />
                <Text>{game['scored by']}</Text>
            </Box>

            <Box>
                <Heading>{game.name}</Heading>
                <Text>{game.description}</Text>
                <Text>{game.platforms}</Text>
                <Text>Developer: {game.developer}</Text>
                <Text>Release Date: {getReleaseDate(dayjs.unix(game.first_release_date).format('DD MMM, YYYY'))}</Text>
                <Text>Publisher: {game.publisher}</Text>
                <Text>Genres: {game.genre}</Text>
                <Text>Game Modes: {game['game modes']}</Text>
                {game.series !== null &&
                    <Text>Series: {game.series}</Text>
                }
            </Box>
            <Box>
                <Heading>Reviews</Heading>
                {game['user reviews'] !== null
                    ? <Text>{game['user reviews']}</Text>
                    : <Text>No reviews have been submitted for this title. Be the first to make a review here!</Text>
                }
            </Box>
        </Box>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const game = await (await fetch(`${process.env.NEXT_PUBLIC_HOST}game/${params.id}`)).json();
    return { props: { game } }
  }
  