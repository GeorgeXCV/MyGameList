import { GetServerSideProps } from 'next'
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";

export default function Profile ({ profile }) {
    return (
        <Box>
            <Box>
                <Image
                src={profile[0].avatar}
                fallbackSrc={`https://via.placeholder.com/175x200?text=${profile[0].username}`}
                alt="Avatar"
                />
                <Heading>{profile[0].username}</Heading>
            </Box>

            <Box>
                <Heading>Favourites</Heading>
                <Heading>Playing</Heading>
                <Heading>Recently Completed</Heading>
            </Box>
        </Box>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const profile = await (await fetch(`${process.env.NEXT_PUBLIC_HOST}${params.profile}`)).json();
    return { props: { profile } }
  }
  