import { GetServerSideProps } from 'next'
import { Box, Heading, Text } from "@chakra-ui/react";
import GameGrid from '../../components/GameGrid';

export default function Profile ({ profile, playing, completed, favourites }) {
    return (
        <Box>
            <Box>
                {/* <Image
                src={profile[0].avatar}
                fallbackSrc={`https://via.placeholder.com/175x200?text=${profile[0].username}`}
                alt="Avatar"
                /> */}
                <Heading>{profile[0].username}</Heading>
            </Box>

            <Box>
                {!playing ? 
                    <>
                    <Heading>Currently Playing</Heading>
                    <Text>No games in progress.</Text>
                    </>
                    :
                    <GameGrid title={"Currently Playing"} games={playing}/>
                }
                {!completed ? 
                    <>
                    <Heading>Recently Completed</Heading>
                    <Text>No games recently completed.</Text>
                    </>
                    :
                    <GameGrid title={"Recently Completed"} games={completed}/>
                }
                {!favourites ? 
                    <>
                    <Heading>Favourites</Heading>
                    <Text>No favourite games.</Text>
                    </>
                    :
                    <GameGrid title={"Favourites"} games={favourites}/>
                }
            </Box>
        </Box>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // Get User ID
    const profile = await (await fetch(`${process.env.NEXT_PUBLIC_HOST}user/${params.profile}`)).json();
    const userID = profile[0].id
    if (userID) {
        // Get all games from user_games with that ID
        const games = await (await fetch(`${process.env.NEXT_PUBLIC_HOST}games/${userID}`)).json();
        const playing = games.filter(game => game.status === "Playing");
        const completed = games.filter(game => game.status === "Played");
        const favourites = games.filter(game => game.favourite === true);
        return { props: { profile, playing, completed, favourites } }
    } else {
        return {
            redirect: {
              permanent: false,
              destination: "/"
            }
        }
    }
}
  