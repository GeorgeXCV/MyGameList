import { Grid, Button } from '@chakra-ui/react';

const PlatformButtons = ({ platforms, setPlatform, defaultPlatform }) => {

    return (
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
               {platforms.map(platform => {
                     return <Button key={platform} autoFocus={defaultPlatform === platform} onClick={() => setPlatform(platform)}>{platform}</Button>
                 })}  
        </Grid>
    )
}

export default PlatformButtons;