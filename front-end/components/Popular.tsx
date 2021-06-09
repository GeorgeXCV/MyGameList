import { Box, Heading, Grid, Skeleton } from "@chakra-ui/react";
import GameCard from "./GameCard";

const Popular = ({ games }) => {
    return (
        <Box mt={10}>
          <Box>
            <Heading size="lg" paddingLeft={7}>
              Popular Right Now
            </Heading>
          </Box>
          <Grid
            gridTemplateColumns={[
              'repeat(2, 1fr)',
              'repeat(2, 1fr)',
              'repeat(5, 1fr)'
            ]}
            gap={3}
          >
            {games
              ? games.map((game => 
                    <GameCard key={game.id} game={game} />
              ))
             : (
              <>
                <Skeleton h="20vh" />
                <Skeleton h="20vh" />
                <Skeleton h="20vh" />
                <Skeleton h="20vh" />
                <Skeleton h="20vh" />
              </>
            )}
          </Grid>
        </Box>
    );
}

export default Popular;