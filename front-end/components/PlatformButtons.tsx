import { Grid, Button } from '@chakra-ui/react';

const PlatformButtons = ({ platforms, setPlatform }) => {
    return (
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
               {platforms.map(platform => {
                     return (
                         <Button onClick={() => setPlatform(platform)}>{platform}</Button>
                     )
                 })}  
        </Grid>
    )
}

export default PlatformButtons;